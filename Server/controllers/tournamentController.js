const Tournament = require("../models/Tournament");

exports.createTournament = async (req, res) => {
    try {

        const {
            name,
            format,
            venue,
            numberOfTeams,
            status,
        } = req.body;

        const tournament = await Tournament.create({
            name,
            format,
            venue,
            numberOfTeams,
            status,
            createdBy: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Tournament created successfully",
            data: tournament,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

exports.getAllTournaments = async (req, res) => {
    try {

        const tournaments = await Tournament.find();

        res.status(200).json({
            success: true,
            count: tournaments.length,
            data: tournaments,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

exports.getTournamentById = async (req, res) => {
    try {

        const tournament = await Tournament.findById(req.params.id);

        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: "Tournament not found",
            });
        }

        res.status(200).json({
            success: true,
            data: tournament,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

exports.updateTournament = async (req, res) => {
    try {

        const updatedTournament = await Tournament.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedTournament) {
            return res.status(404).json({
                success: false,
                message: "Tournament not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Tournament updated successfully",
            data: updatedTournament,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

exports.deleteTournament = async (req, res) => {
    try {

        const tournament = await Tournament.findByIdAndDelete(req.params.id);

        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: "Tournament not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Tournament deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};