const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  // keep it flexible (no enum)
  category: {
    type: String,
    required: true
  },

  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true
    }
  ],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Survey", surveySchema);