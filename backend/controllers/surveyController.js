
const Survey = require("../models/surveyModel");

// CREATE SURVEY
exports.createSurvey = async (req, res) => {
  try {
    const { title, category, questions } = req.body;

    const survey = await Survey.create({
      title,
      category,
      questions,
      createdBy: req.user.id
    });

    res.json(survey);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET SURVEY BY ID
exports.getSurvey = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id)
      .populate("questions");

    if (!survey) {
      return res.status(404).json({ msg: "Survey not found" });
    }

    res.json(survey);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// GET SURVEYS BY CATEGORY (TYPE)
exports.getSurveyByCategory = async (req, res) => {
    try {
        const { type } = req.params;

        const surveys = await Survey.find({ category: type })
            .populate("questions");

        res.json(surveys);

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};