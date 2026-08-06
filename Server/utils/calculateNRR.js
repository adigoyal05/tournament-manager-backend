const calculateNRR = (team) => {

    if (
        team.oversFaced === 0 ||
        team.oversBowled === 0
    ) {
        team.nrr = 0;
        return;
    }

    const runRateScored =
        team.runsScored / team.oversFaced;

    const runRateConceded =
        team.runsConceded / team.oversBowled;

    team.nrr = Number(
        (runRateScored - runRateConceded).toFixed(3)
    );
};

module.exports = calculateNRR;