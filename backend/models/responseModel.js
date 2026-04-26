const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
    poll: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poll",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    optionIndex: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// ❌ prevent duplicate voting
responseSchema.index({ poll: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Response", responseSchema);