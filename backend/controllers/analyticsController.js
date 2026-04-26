const Response = require("../models/Response");

// total responses per survey
exports.getAnalytics = async (req, res) => {
  try {
    const data = await Response.aggregate([
      {
        $group: {
          _id: "$survey",
          totalResponses: { $sum: 1 },
        },
      },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching analytics" });
  }
};