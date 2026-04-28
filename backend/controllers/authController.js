// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// // REGISTER
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ msg: "User already exists" });

//     const hashed = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashed,
//     });

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       sameSite: "lax",
//     });

//     res.json({ msg: "Registered successfully" });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// // LOGIN
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       sameSite: "lax",
//     });

//     res.json({ msg: "Login success" });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// // VERIFY
// exports.verify = async (req, res) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).json({ msg: "No token" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select("-password");

//     res.json({ user });
//   } catch {
//     res.status(401).json({ msg: "Invalid token" });
//   }
// };

// // LOGOUT
// exports.logout = (req, res) => {
//   res.clearCookie("token");
//   res.json({ msg: "Logged out" });
// };

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// // REGISTER
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ msg: "User already exists" });

//     const hashed = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashed,
//     });

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//      sameSite: "none", 
//       secure: false
//     });

//     res.json({
//       msg: "Registered successfully",
//       user: { id: user._id, name: user.name, email: user.email }
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // LOGIN
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//      sameSite: "none", 
//       secure: false
//     });

//     res.json({
//       msg: "Login success",
//       user: { id: user._id, name: user.name, email: user.email }
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // VERIFY USER
// exports.verify = async (req, res) => {
//   const token = req.cookies.token;

//   if (!token) return res.status(401).json({ msg: "No token" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id).select("-password");

//     res.json({ user });

//   } catch (err) {
//     res.status(401).json({ msg: "Invalid token" });
//   }
// };

// // LOGOUT
// exports.logout = (req, res) => {
//   res.clearCookie("token");
//   res.json({ msg: "Logged out" });
// };

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const SECRET = process.env.JWT_SECRET || "secret";

// 🔹 Helper: create & send cookie
const sendToken = (res, user) => {
  const token = jwt.sign(
    { id: user._id },
    SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",   // ✅ works on localhost
    secure: false      // ✅ true only in production (HTTPS)
  });

  return token;
};

// 🔹 REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
     if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    sendToken(res, user);

    res.json({
      msg: "Registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// 🔹 LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    sendToken(res, user);

    res.json({
      msg: "Login success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// 🔹 VERIFY (used with authMiddleware)
exports.verify = async (req, res) => {
  try {
    // req.user comes from authMiddleware
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ user });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// 🔹 LOGOUT
exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  });

  res.json({ msg: "Logged out successfully" });
};