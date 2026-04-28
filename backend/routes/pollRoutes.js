// const router = require("express").Router();
// const { createPoll, votePoll, getPolls } = require("../controllers/pollController");

// const auth = require("../middleware/authMiddleware");
// const admin = require("../middleware/adminMiddleware"); // ✅ ADD THIS
// const Poll = require("../models/Poll"); // ✅ ADD THIS

// // CREATE POLL
// router.post("/", auth, createPoll);

// // VOTE
// router.post("/:id/vote", auth, votePoll);

// // GET ALL POLLS
// router.get("/", getPolls);

// // 🔥 DELETE POLL (ADMIN ONLY)
// router.delete("/:id", auth, admin, async (req, res) => {
//   try {
//     const poll = await Poll.findById(req.params.id);

//     if (!poll) {
//       return res.status(404).json({ msg: "Poll not found" });
//     }

//     await Poll.findByIdAndDelete(req.params.id);

//     res.json({ msg: "Poll deleted successfully" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // module.exports = router;
// const router = require("express").Router();
// const { createPoll, votePoll, getPolls, getPollResults } = require("../controllers/pollController");

// const auth = require("../middleware/authMiddleware");
// const admin = require("../middleware/adminMiddleware");



// // ✅ FIXED IMPORT
// const Poll = require("../models/pollModel");

// // CREATE POLL
// router.post("/", createPoll);

// // VOTE
// router.post("/:id/vote", auth, votePoll);

// // GET ALL POLLS
// router.get("/", getPolls);

// // add this
// router.get("/results/:id", getPollResults);
// router.get("/", protect, getPolls);  // ✅
// // DELETE POLL (ADMIN)
// router.delete("/:id", auth, admin, async (req, res) => {
//   try {
//     const poll = await Poll.findById(req.params.id);

//     if (!poll) {
//       return res.status(404).json({ msg: "Poll not found" });
//     }

//     await Poll.findByIdAndDelete(req.params.id);

//     res.json({ msg: "Poll deleted successfully" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });
// router.post("/response", async (req, res) => {
//   const { poll, answer } = req.body;

//   if (!poll) {
//     return res.status(400).json({ msg: "Poll ID missing" });
//   }

//   try {
//     console.log("poll:", poll);

//     // TODO: save response here

//     res.json({ msg: "Response saved" });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// module.exports = router;

// const router = require("express").Router();

// const {
//   createPoll,
//   votePoll,
//   getPolls,
//   getPollResults
// } = require("../controllers/pollController");

// const auth = require("../middleware/authMiddleware");
// const admin = require("../middleware/adminMiddleware");

// const Poll = require("../models/pollModel");

// // CREATE POLL
// router.post("/", auth, createPoll);

// // VOTE
// router.post("/:id/vote", auth, votePoll);

// // GET ALL POLLS
// router.get("/", auth, getPolls);

// // RESULTS
// router.get("/:id", async (req, res) => {
//   try {
//     const poll = await Poll.findById(req.params.id);

//     console.log("Requested ID:", req.params.id);
//     console.log("Found Poll:", poll);

//     if (!poll) {
//       return res.status(404).json({ msg: "Poll not found" });
//     }

//     res.json(poll);
//   } catch (err) {
//     console.log("ERROR:", err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // DELETE POLL (ADMIN)
// router.delete("/:id", auth, admin, async (req, res) => {
//   try {
//     const poll = await Poll.findById(req.params.id);

//     if (!poll) {
//       return res.status(404).json({ msg: "Poll not found" });
//     }

//     await Poll.findByIdAndDelete(req.params.id);

//     res.json({ msg: "Poll deleted successfully" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

const express = require("express");
const router = require("express").Router();
const {
  createPoll,
  votePoll,
  getPolls,
  getPollResults
} = require("../controllers/pollController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const Poll = require("../models/pollModel");

// CREATE
router.post("/", auth, createPoll);

// GET ALL
router.get("/", auth, getPolls);

// GET SINGLE POLL
router.get("/:id", auth, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({ msg: "Poll not found" });
    }

    res.json(poll);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// VOTE
router.post("/:id/vote", auth, votePoll);

// DELETE
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) return res.status(404).json({ msg: "Poll not found" });

    await Poll.findByIdAndDelete(req.params.id);

    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;