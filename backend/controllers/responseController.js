const Poll = require("../models/pollModel");
const Survey = require("../models/surveyModel");
const Response = require("../models/responseModel");


// ✅ POLL VOTE (your improved version)
exports.vote = async (req, res) => {
    try {
        const { pollId, optionIndex } = req.body;

        const poll = await Poll.findById(pollId);
        if (!poll) {
            return res.status(404).json({ msg: "Poll not found" });
        }

        // 🔥 better validation
        if (optionIndex < 0 || optionIndex >= poll.options.length) {
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

        // 🔥 update vote
        poll.options[optionIndex].votes++;
        await poll.save();

        // 🔥 save response
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



// ✅ SURVEY SUBMIT (NEW)
exports.submitSurvey = async (req, res) => {
    try {
        const { surveyId, answers } = req.body;

        const survey = await Survey.findById(surveyId);
        if (!survey) {
            return res.status(404).json({ msg: "Survey not found" });
        }

        // ❌ already submitted
        const existing = await Response.findOne({
            survey: surveyId,
            user: req.user.id
        });

        if (existing) {
            return res.status(400).json({ msg: "Already submitted" });
        }

        // 🔥 validate answers
        if (!answers || answers.length !== survey.questions.length) {
            return res.status(400).json({ msg: "Invalid answers" });
        }

        // 🔥 update votes
        answers.forEach(ans => {
            const q = survey.questions[ans.questionIndex];

            if (q && q.options[ans.selectedOption]) {
                q.options[ans.selectedOption].votes++;
            }
        });

        await survey.save();

        // 🔥 save response
        await Response.create({
            survey: surveyId,
            user: req.user.id,
            aanswers[]
        });

        res.json({ msg: "Survey submitted successfully" });

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};