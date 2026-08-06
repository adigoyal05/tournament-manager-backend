const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        tournament: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament",
            required: true,
        },

        teamA: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true,
        },

        teamB: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true,
        },
        teamAScore: {
            type: Number,
            default: 0,
        },

        teamAWickets: {
            type: Number,
            default: 0,
        },

        teamAOvers: {
            type: Number,
            default: 0,
        },

        teamBScore: {
            type: Number,
            default: 0,
        },

        teamBWickets: {
            type: Number,
            default: 0,
        },

        teamBOvers: {
            type: Number,
            default: 0,
        },
        matchDate: {
            type: Date,
            required: true,
        },

        venue: {
            type: String,
            required: true,
        },
        
        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            default: null,
        },

        status: {
            type: String,
            enum: ["Upcoming", "Live", "Completed"],
            default: "Upcoming",
        },
        result: {
            type: String,
            default: "",
        },
        playerOfTheMatch: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Match", matchSchema);