const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    googleId: String,
    avatar: String,
    role: {
        type: String,
        default: "user"
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);