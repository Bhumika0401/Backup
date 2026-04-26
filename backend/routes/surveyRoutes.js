const router = require("express").Router();
const { createSurvey, getSurvey } = require("../controllers/surveyController");
const auth = require("../middleware/authMiddleware");

// create survey (protected)
router.post("/", auth, createSurvey);

// get survey by id
router.get("/", getSurvey);

module.exports = router;