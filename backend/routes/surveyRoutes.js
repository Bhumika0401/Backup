const router = require("express").Router();
const {
  createSurvey,
  getSurvey,
  getAllSurveys
} = require("../controllers/surveyController");

const auth = require("../middleware/authMiddleware");

router.post("/", auth, createSurvey);
router.get("/", getAllSurveys);
router.get("/:id", getSurvey);

module.exports = router;