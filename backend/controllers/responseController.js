const Poll = require("../models/pollModel");
const Response = require("../models/responseModel");

exports.vote = async (req, res) => {
    try {
        const { pollId, optionIndex } = req.body;

        // check poll exists
        const poll = await Poll.findById(pollId);
        if (!poll) {
            return res.status(404).json({ msg: "Poll not found" });
        }

        // check option index
        if (optionIndex >= poll.options.length) {
            return res.status(400).json({ msg: "Invalid option" });
        }

        // ❌ already voted
        const existing = await Response.findOne({
            poll: pollId,
            user: req.user.id
        });

        if (existing) {
            return res.status(400).json({ msg: "You already voted" });
        }

        // increase vote
        poll.options[optionIndex].votes++;
        await poll.save();

        // save response
        await Response.create({
            poll: pollId,
            user: req.user.id,
            optionIndex
        });

        res.json({ msg: "Vote recorded successfully", poll });

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};