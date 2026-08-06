const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },

        tournament: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament",
            required: true,
        },

        captain: {
            type: String,
            required: true,
        },

        players: [
            {
                type: String,
            },
        ],

        matchesPlayed: {
            type: Number,
            default: 0,
        },

        wins: {
            type: Number,
            default: 0,
        },

        losses: {
            type: Number,
            default: 0,
        },

        ties: {
            type: Number,
            default: 0,
        },

        points: {
            type: Number,
            default: 0,
        },

        nrr: {
            type: Number,
            default: 0,
        },
        runsScored: {
            type: Number,
            default: 0,
        },

        oversFaced: {
            type: Number,
            default: 0,
        },

        runsConceded: {
            type: Number,
            default: 0,
        },

        oversBowled: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Team", teamSchema);