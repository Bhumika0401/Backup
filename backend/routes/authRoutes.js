// const router = require("express").Router();
// const auth = require("../middleware/authMiddleware");
// const passport = require("passport");

// const {
//   register,
//   login,
//   verify,
//   logout,
// } = require("../controllers/authController");

// // 🔹 AUTH ROUTES
// router.post("/register", register);
// router.post("/login", login);
// router.get("/verify", auth, verify);
// router.get("/logout", logout);

// // 🔹 GOOGLE AUTH
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     res.redirect("http://localhost:3000/home");
//   }
// );
const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const passport = require("passport");
const jwt = require("jsonwebtoken"); // ✅ ADD THIS

const {
  register,
  login,
  verify,
  logout,
} = require("../controllers/authController");

// 🔹 AUTH ROUTES
router.post("/register", register);
router.post("/login", login);
router.get("/verify", auth, verify);
router.get("/logout", logout);

// 🔹 GOOGLE AUTH
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    session: true,
  }),
  (req, res) => {
    try {
      // ✅ Create JWT from logged-in user
      const token = jwt.sign(
        { id: req.user._id },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "7d" }
      );

      // ✅ Send token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production (HTTPS)
        sameSite: "lax",
      });

      // ✅ Redirect to frontend
      res.redirect("http://localhost:3000/home");
    } catch (err) {
      console.log(err);
      res.redirect("http://localhost:3000/login");
    }
  }
);

// 🔹 LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out successfully" });
});

module.exports = router;