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

// module.exports = router;
const router = require("express").Router();
const { createPoll, votePoll, getPolls, getPollResults } = require("../controllers/pollController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");



// ✅ FIXED IMPORT
const Poll = require("../models/pollModel");

// CREATE POLL
router.post("/", auth, createPoll);

// VOTE
router.post("/:id/vote", auth, votePoll);

// GET ALL POLLS
router.get("/", getPolls);

// add this
router.get("/results/:id", getPollResults);
// DELETE POLL (ADMIN)
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({ msg: "Poll not found" });
    }

    await Poll.findByIdAndDelete(req.params.id);

    res.json({ msg: "Poll deleted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;