// const Poll = require("../models/Poll");

// // exports.createPoll = async (req, res) => {
// //     const { question, options } = req.body;

// //     const poll = await Poll.create({
// //         question,
// //         options: options.map(opt => ({ text: opt })),
// //         createdBy: req.user.id
// //     });

// //     res.json(poll);
// // };
// exports.createPoll = async (req, res) => {
//   try {
//     const { question, type, options } = req.body;

//     const poll = new Poll({
//       question,
//       type,
//       options,
//       createdBy: req.user.id // 🔥 important
//     });

//     await poll.save();

//     res.json(poll);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };
// exports.votePoll = async (req, res) => {
//     const { optionIndex } = req.body;

//     const poll = await Poll.findById(req.params.id);
//     poll.options[optionIndex].votes++;

//     await poll.save();

//     res.json(poll);
// };

// exports.getPolls = async (req, res) => {
//     const polls = await Poll.find();
//     res.json(polls);
// };


// const Poll = require("../models/Poll");

// // create poll
// exports.createPoll = async (req, res) => {
//     try {
//         const poll = await Poll.create({
//             ...req.body,
//             createdBy: req.user.id || req.user._id   // ✅ fixed
//         });

//         res.json(poll);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // get polls by type
// exports.getPollsByCategory = async (req, res) => {
//     try {
//         const polls = await Poll.find({ type: req.params.type }); // ✅ fixed
//         res.json(polls);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }


// exports.votePoll = async (req, res) => {
//     const { optionIndex } = req.body;

//     const poll = await Poll.findById(req.params.id);
//     poll.options[optionIndex].votes++;

//     await poll.save();

//     res.json(poll);
// };

// exports.getPolls = async (req, res) => {
//     const polls = await Poll.find();
//     res.json(polls);
// };
// ✅ FIXED IMPORT
const Poll = require("../models/pollModel");

// CREATE POLL
exports.createPoll = async (req, res) => {
    try {
        const poll = await Poll.create({
            ...req.body,
            createdBy: req.user.id || req.user._id
        });

        res.json(poll);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// GET POLL RESULTS WITH PERCENTAGE
exports.getPollResults = async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id);

        if (!poll) {
            return res.status(404).json({ msg: "Poll not found" });
        }

        const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

        const results = poll.options.map(opt => {
            return {
                label: opt.text,
                votes: opt.votes,
                percentage: totalVotes === 0 
                    ? 0 
                    : Number(((opt.votes / totalVotes) * 100).toFixed(2))
            };
        });

        res.json({
            question: poll.question,
            totalVotes,
            labels: results.map(r => r.label),
            data: results.map(r => r.votes),
            percentages: results.map(r => r.percentage),
            results
        });

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
// GET BY TYPE
exports.getPollsByCategory = async (req, res) => {
    try {
        const polls = await Poll.find({ type: req.params.type });
        res.json(polls);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// VOTE
exports.votePoll = async (req, res) => {
    try {
        const { optionIndex } = req.body;

        const poll = await Poll.findById(req.params.id);

        if (!poll) {
            return res.status(404).json({ msg: "Poll not found" });
        }

        if (optionIndex >= poll.options.length) {
            return res.status(400).json({ msg: "Invalid option" });
        }

        poll.options[optionIndex].votes++;

        await poll.save();

        res.json(poll);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET ALL
exports.getPolls = async (req, res) => {
    try {
        const polls = await Poll.find();
        res.json(polls);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};