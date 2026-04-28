const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // 🟢 POLL (optional now)
    poll: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poll",
        default: null
    },

    optionIndex: {
        type: Number,
        default: null
    },

    // 🔵 SURVEY (new)
    survey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Survey",
        default: null
    },

    answers: [
        {
            questionIndex: Number,
            selectedOption: Number
        }
    ]

}, { timestamps: true });


// 🔥 prevent duplicate poll vote
responseSchema.index(
    { poll: 1, user: 1 },
    {
        unique: true,
        partialFilterExpression: { poll: { $exists: true, $ne: null } }
    }
);

// 🔥 prevent duplicate survey submission
responseSchema.index(
    { survey: 1, user: 1 },
    {
        unique: true,
        partialFilterExpression: { survey: { $exists: true, $ne: null } }
    }
);

module.exports = mongoose.model("Response", responseSchema);