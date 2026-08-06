const Tournament = require("../models/Tournament");
const calculateNRR = require("./calculateNRR");

const getMaximumOvers = (format) => {

    switch (format) {

        case "T10":
            return 10;

        case "T20":
            return 20;

        case "ODI":
            return 50;

        default:
            return 90;
    }

};

const updateTeamStats = async (teamA, teamB, match) => {

    const tournament = await Tournament.findById(match.tournament);

    let teamAOvers = match.teamAOvers;
    let teamBOvers = match.teamBOvers;

    // Official ICC NRR Rule
    if (match.teamAWickets === 10) {
        teamAOvers = getMaximumOvers(tournament.format);
    }

    if (match.teamBWickets === 10) {
        teamBOvers = getMaximumOvers(tournament.format);
    }

    // Matches
    teamA.matchesPlayed++;
    teamB.matchesPlayed++;

    // Runs
    teamA.runsScored += match.teamAScore;
    teamA.runsConceded += match.teamBScore;

    teamB.runsScored += match.teamBScore;
    teamB.runsConceded += match.teamAScore;

    // Overs
    teamA.oversFaced += teamAOvers;
    teamA.oversBowled += teamBOvers;

    teamB.oversFaced += teamBOvers;
    teamB.oversBowled += teamAOvers;

    // Result
    if (match.teamAScore > match.teamBScore) {

        teamA.wins++;
        teamA.points += 2;

        teamB.losses++;

    }

    else if (match.teamBScore > match.teamAScore) {

        teamB.wins++;
        teamB.points += 2;

        teamA.losses++;

    }

    else {

        teamA.ties++;
        teamB.ties++;

        teamA.points++;
        teamB.points++;

    }

    calculateNRR(teamA);
    calculateNRR(teamB);

    await teamA.save();
    await teamB.save();

};

module.exports = updateTeamStats;