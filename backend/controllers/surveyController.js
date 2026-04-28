const Survey = require("../models/surveyModel");

// CREATE SURVEY (with direct questions)
exports.createSurvey = async (req, res) => {
    try {
        const { title, category, questions } = req.body;

        if (!title || !category || !questions || questions.length === 0) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const survey = await Survey.create({
            title,
            category,
            questions, // 🔥 now direct objects
            createdBy: req.user.id
        });

        res.json(survey);

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
// GET ALL SURVEYS
exports.getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// GET SURVEY
exports.getSurvey = async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);

        if (!survey) {
            return res.status(404).json({ msg: "Survey not found" });
        }

        res.json(survey);

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// GET BY CATEGORY
exports.getSurveyByCategory = async (req, res) => {
    try {
        const surveys = await Survey.find({ category: req.params.type });
        res.json(surveys);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};