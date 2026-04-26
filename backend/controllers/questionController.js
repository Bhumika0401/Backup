const Question = require("../models/questionModel");


// ✅ CREATE SINGLE QUESTION (with duplicate check)
exports.createQuestion = async (req, res) => {
  try {
    const { questionText, type, options } = req.body;

    // check required fields
    if (!questionText || !type || !options) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // 🔥 prevent duplicate (case-insensitive)
    const existing = await Question.findOne({
      questionText: { $regex: new RegExp(`^${questionText}$`, "i") }
    });

    if (existing) {
      return res.status(400).json({ msg: "Question already exists" });
    }

    const question = await Question.create({
      questionText: questionText.trim(),
      type: type.trim(),
      options
    });

    res.status(201).json(question);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// ✅ CREATE MULTIPLE QUESTIONS (skip duplicates)
exports.createMultipleQuestions = async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ msg: "Send array of questions" });
    }

    // remove duplicates before insert
    const filtered = [];

    for (let q of data) {
      const exists = await Question.findOne({
        questionText: { $regex: new RegExp(`^${q.questionText}$`, "i") }
      });

      if (!exists) {
        filtered.push({
          questionText: q.questionText.trim(),
          type: q.type.trim(),
          options: q.options
        });
      }
    }

    const questions = await Question.insertMany(filtered);

    res.status(201).json({
      added: questions.length,
      skipped: data.length - questions.length,
      questions
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// ✅ GET QUESTIONS BY CATEGORY
exports.getQuestionsByType = async (req, res) => {
  try {
    const questions = await Question.find({ type: req.params.type });

    if (questions.length === 0) {
      return res.status(404).json({ msg: "No questions found" });
    }

    res.json(questions);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// ✅ GET ALL QUESTIONS
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};