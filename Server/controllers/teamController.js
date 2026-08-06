const Team = require("../models/Team");
const Tournament = require("../models/Tournament");

// Create Team
exports.createTeam = async (req, res) => {
    try {

        const {
            name,
            captain,
            players,
            tournament,
        } = req.body;

        // Check if tournament exists
        const existingTournament = await Tournament.findById(tournament);

        if (!existingTournament) {
            return res.status(404).json({
                success: false,
                message: "Tournament not found",
            });
        }

        // Check duplicate team name in same tournament
        const existingTeam = await Team.findOne({
            name,
            tournament,
        });

        if (existingTeam) {
            return res.status(400).json({
                success: false,
                message: "Team already exists in this tournament",
            });
        }

        // Check if tournament is already full
        const currentTeams = await Team.countDocuments({
            tournament,
        });

        if (currentTeams >= existingTournament.numberOfTeams) {
            return res.status(400).json({
                success: false,
                message: "Tournament is already full",
            });
        }

        const team = await Team.create({
            name,
            captain,
            players,
            tournament,
            createdBy: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Team created successfully",
            data: team,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Get All Teams
exports.getAllTeams = async (req, res) => {
    try {

        const teams = await Team.find();

        res.status(200).json({
            success: true,
            count: teams.length,
            data: teams,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Get Team By ID
exports.getTeamById = async (req, res) => {
    try {

        const team = await Team.findById(req.params.id);

        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Team not found",
            });
        }

        res.status(200).json({
            success: true,
            data: team,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Update Team
exports.updateTeam = async (req, res) => {
    try {

        const updatedTeam = await Team.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedTeam) {
            return res.status(404).json({
                success: false,
                message: "Team not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Team updated successfully",
            data: updatedTeam,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Delete Team
exports.deleteTeam = async (req, res) => {
    try {

        const deletedTeam = await Team.findByIdAndDelete(req.params.id);

        if (!deletedTeam) {
            return res.status(404).json({
                success: false,
                message: "Team not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Team deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Get Teams of a Particular Tournament
exports.getTournamentTeams = async (req, res) => {
    try {

        const teams = await Team.find({
            tournament: req.params.id,
        });

        res.status(200).json({
            success: true,
            count: teams.length,
            data: teams,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};