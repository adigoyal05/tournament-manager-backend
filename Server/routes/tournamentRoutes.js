const express = require("express");
const router = express.Router();

const {
    createTournament,
    getAllTournaments,
    getTournamentById,
    updateTournament,
    deleteTournament,
} = require("../controllers/tournamentController");

const { protect } = require("../middleware/authMiddleware");

const {
    checkOwnership,
} = require("../middleware/authorizationMiddleware");

const Tournament = require("../models/Tournament");

// Public Routes
router.get("/", getAllTournaments);
router.get("/:id", getTournamentById);

// Protected Routes
router.post("/", protect, createTournament);

router.put(
    "/:id",
    protect,
    checkOwnership(Tournament),
    updateTournament
);

router.delete(
    "/:id",
    protect,
    checkOwnership(Tournament),
    deleteTournament
);

module.exports = router;