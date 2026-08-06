const express = require("express");
const router = express.Router();

const {
    scheduleMatch,
    getAllMatches,
    getMatchById,
    updateMatch,
    deleteMatch,
    updateMatchResult,
} = require("../controllers/matchController");

const { protect } = require("../middleware/authMiddleware");

const {
    checkOwnership,
} = require("../middleware/authorizationMiddleware");

const Match = require("../models/Match");

// Public Routes
router.get("/", getAllMatches);

router.get("/:id", getMatchById);

// Protected Routes
router.post("/", protect, scheduleMatch);

router.put(
    "/:id",
    protect,
    checkOwnership(Match),
    updateMatch
);

router.delete(
    "/:id",
    protect,
    checkOwnership(Match),
    deleteMatch
);

router.post(
    "/:id/result",
    protect,
    checkOwnership(Match),
    updateMatchResult
);

module.exports = router;