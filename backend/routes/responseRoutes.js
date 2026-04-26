const router = require("express").Router();

const { vote } = require("../controllers/responseController");
const auth = require("../middleware/authMiddleware");

// vote route
router.post("/vote", auth, vote);

module.exports = router;