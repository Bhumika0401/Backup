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
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000/home");
  }
);
router.post("/logout", (req, res) => {
  res.clearCookie("token"); // if using cookies
  res.json({ msg: "Logged out successfully" });
});
module.exports = router;