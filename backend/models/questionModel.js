const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
    unique: true,        // 🔥 prevents duplicate questions
    trim: true
  },

  options: [
    {
      text: {
        type: String,
        required: true
      }
    }
  ],

  type: {
    type: String,
    required: true,
    trim: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);