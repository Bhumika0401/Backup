// // require("dotenv").config();

// // const express = require("express");
// // const mongoose = require("mongoose");
// // const session = require("express-session");
// // const cors = require("cors");
// // const cookieParser = require("cookie-parser");
// // const passport = require("./config/passport");

// // const app = express();

// // // middleware
// // app.use(cors({
// //   origin: "http://localhost:3000",
// //   credentials: true
// // }));

// // app.use(express.json());

// // app.use(session({
// //   secret: "mysecretkey",
// //   resave: false,
// //   saveUninitialized: false,
// // }));

// // app.use(cookieParser());

// // app.use(passport.initialize());
// // app.use(passport.session());

// // // DB CONNECT
// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => console.log("DB connected"))
// //   .catch((err) => console.log("DB error:", err.message));

// // // ROUTES
// // app.use("/api/auth", require("./routes/authRoutes"));
// // app.use("/api/polls", require("./routes/pollRoutes"));
// // app.use("/api/questions", require("./routes/questionRoutes"));

// // // START SERVER
// // app.listen(process.env.PORT, () => {
// //   console.log("Server running on " + process.env.PORT);
// // });

// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const session = require("express-session");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const passport = require("./config/passport");

// const app = express();

// // 🔹 CORS (must be first)
// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));

// // 🔹 Body parser
// app.use(express.json());

// // 🔹 Cookie parser (needed for JWT)
// app.use(cookieParser());

// // 🔹 Session (needed for Passport Google)
// app.use(session({
//   secret: process.env.SESSION_SECRET || "mysecretkey",
//   resave: false,
//   saveUninitialized: false,
// }));

// // 🔹 Passport
// app.use(passport.initialize());
// app.use(passport.session());

// // 🔹 DB CONNECT
// mongoose.connect(process.env.MONGO_URI, {
 
// })
// .then(() => console.log("✅ DB connected"))
// .catch((err) => console.log("❌ DB error:", err.message));

// // 🔹 ROUTES
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/polls", require("./routes/pollRoutes"));
// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/questions", require("./routes/questionRoutes"));

// // 🔹 TEST ROUTE (optional but useful)
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // 🔹 SERVER START
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport");

const app = express();

// ✅ MIDDLEWARE
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: "mysecretkey",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// ✅ DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB connected"))
  .catch((err) => console.log("❌ DB error:", err.message));

// ✅ ROUTES (VERY IMPORTANT)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/polls", require("./routes/pollRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/responses", require("./routes/responseRoutes"));   // voting
app.use("/api/surveys", require("./routes/surveyRoutes"));       // surveys
app.use("/api/data", require("./routes/dataRoutes"));
// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ SERVER START
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});