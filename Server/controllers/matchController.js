const Match = require("../models/Match");
const Team = require("../models/Team");
const Tournament = require("../models/Tournament");

const updateTeamStats = require("../utils/updateTeamStats");

exports.scheduleMatch = async (req, res) => {

    try {

        const {
            tournament,
            teamA,
            teamB,
            matchDate,
            venue,
        } = req.body;

        if (teamA === teamB) {
            return res.status(400).json({
                success: false,
                message: "A team cannot play against itself.",
            });
        }

        const tournamentExists =
            await Tournament.findById(tournament);

        if (!tournamentExists) {
            return res.status(404).json({
                success: false,
                message: "Tournament not found.",
            });
        }

        const firstTeam =
            await Team.findById(teamA);

        const secondTeam =
            await Team.findById(teamB);

        if (!firstTeam || !secondTeam) {
            return res.status(404).json({
                success: false,
                message: "One or both teams not found.",
            });
        }

        if (
            firstTeam.tournament.toString() !== tournament ||
            secondTeam.tournament.toString() !== tournament
        ) {

            return res.status(400).json({
                success: false,
                message: "Both teams must belong to the selected tournament.",
            });

        }

        // Prevent duplicate fixtures
        const existingMatch = await Match.findOne({

            tournament,

            $or: [

                {
                    teamA,
                    teamB,
                },

                {
                    teamA: teamB,
                    teamB: teamA,
                }

            ]

        });

        if (existingMatch) {

            return res.status(400).json({
                success: false,
                message: "This match is already scheduled.",
            });

        }
        const match = await Match.create({

            tournament,

            teamA,

            teamB,

            matchDate,

            venue,

            createdBy: req.user.id,

        });

        res.status(201).json({

            success: true,

            message: "Match scheduled successfully.",

            data: match,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

exports.getAllMatches = async (req,res)=>{

    try{

        const matches = await Match.find();

        res.status(200).json({

            success:true,

            count:matches.length,

            data:matches,

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message,

        });

    }

}

exports.getMatchById = async(req,res)=>{

    try{

        const match = await Match.findById(req.params.id);

        if(!match){

            return res.status(404).json({

                success:false,

                message:"Match not found",

            });

        }

        res.status(200).json({

            success:true,

            data:match,

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message,

        });

    }

}

exports.updateMatch = async(req,res)=>{

    try{

        const updatedMatch = await Match.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new:true,

                runValidators:true,

            }

        );

        if(!updatedMatch){

            return res.status(404).json({

                success:false,

                message:"Match not found",

            });

        }

        res.status(200).json({

            success:true,

            message:"Match updated successfully",

            data:updatedMatch,

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message,

        });

    }

}

exports.updateMatchResult = async (req, res) => {
    try {

        const {
            teamAScore,
            teamAWickets,
            teamAOvers,
            teamBScore,
            teamBWickets,
            teamBOvers,
            playerOfTheMatch,
        } = req.body;

        // Find Match
        const match = await Match.findById(req.params.id);

        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Match not found",
            });
        }

        // Prevent updating completed matches
        if (match.status === "Completed") {
            return res.status(400).json({
                success: false,
                message: "Result already entered",
            });
        }

        // Update scores
        match.teamAScore = teamAScore;
        match.teamAWickets = teamAWickets;
        match.teamAOvers = teamAOvers;

        match.teamBScore = teamBScore;
        match.teamBWickets = teamBWickets;
        match.teamBOvers = teamBOvers;

        match.playerOfTheMatch = playerOfTheMatch;

        // Fetch teams
        const teamA = await Team.findById(match.teamA);
        const teamB = await Team.findById(match.teamB);

        // Decide Winner
        if (teamAScore > teamBScore) {

            match.winner = teamA._id;

            match.result =
                `${teamA.name} won by ${teamAScore - teamBScore} runs`;

        }

        else if (teamBScore > teamAScore) {

            match.winner = teamB._id;

            const wicketsRemaining = 10 - teamBWickets;

            match.result =
                `${teamB.name} won by ${wicketsRemaining} wickets`;

        }

        else {

            match.winner = null;

            match.result = "Match Tied";

        }

        // Match completed
        match.status = "Completed";

        // Update team statistics
        await updateTeamStats(teamA, teamB, match);

        // Save Match
        await match.save();

        res.status(200).json({

            success: true,

            message: "Match result updated successfully",

            data: match,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

exports.deleteMatch = async(req,res)=>{

    try{

        const match = await Match.findByIdAndDelete(req.params.id);

        if(!match){

            return res.status(404).json({

                success:false,

                message:"Match not found",

            });

        }

        res.status(200).json({

            success:true,

            message:"Match deleted successfully",

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message,

        });

    }

}