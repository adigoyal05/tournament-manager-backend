const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        format: {
            type: String,
            enum: ["T10", "T20", "ODI", "Test"],
            required: true,
        },

        venue: {
            type: String,
            required: true,
        },

        numberOfTeams: {
            type: Number,
            required: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        status: {
            type: String,
            enum: ["Upcoming", "Ongoing", "Completed"],
            default: "Upcoming",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Tournament", tournamentSchema);