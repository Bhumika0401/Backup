const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

// ✅ import all controllers properly (ONE TIME)
const {
  createQuestion,
  createMultipleQuestions,
  getQuestionsByType,
  getQuestions
} = require("../controllers/questionController");


// ✅ CREATE SINGLE
router.post("/", auth, createQuestion);

// ✅ CREATE MULTIPLE
router.post("/bulk", auth, createMultipleQuestions);

// ✅ GET BY CATEGORY
router.get("/type/:type", getQuestionsByType);

// ✅ GET ALL
router.get("/", getQuestions);

module.exports = router;