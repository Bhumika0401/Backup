const router = require("express").Router();

const { vote, submitSurvey } = require("../controllers/responseController");
const auth = require("../middleware/authMiddleware");

// 🟢 poll vote (keep your existing style)
router.post("/vote", auth, vote);

// 🔵 survey submit (new)
router.post("/survey", auth, submitSurvey);

module.exports = router;