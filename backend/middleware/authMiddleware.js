const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "secret";

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  // ❌ No token
  if (!token) {
    return res.status(401).json({ msg: "No token" });
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, SECRET);

    // ✅ Attach user to request
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};