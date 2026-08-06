const express = require("express");
const router = express.Router();

const {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam,
    getTournamentTeams,
} = require("../controllers/teamController");

const { protect } = require("../middleware/authMiddleware");

const {
    checkOwnership,
} = require("../middleware/authorizationMiddleware");

const Team = require("../models/Team");

// Public Routes
router.get("/", getAllTeams);

router.get("/tournament/:id", getTournamentTeams);

router.get("/:id", getTeamById);

// Protected Routes
router.post("/", protect, createTeam);

router.put(
    "/:id",
    protect,
    checkOwnership(Team),
    updateTeam
);

router.delete(
    "/:id",
    protect,
    checkOwnership(Team),
    deleteTeam
);

module.exports = router;