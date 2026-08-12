import { useEffect, useState } from "react";
import api from "../services/api";

function Matches() {

    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState([]);
    const [tournaments, setTournaments] = useState([]);

    const [showScheduleForm, setShowScheduleForm] = useState(false);
    const [showResultForm, setShowResultForm] = useState(false);

    const [message, setMessage] = useState("");

    const [scheduleData, setScheduleData] = useState({
        tournament: "",
        teamA: "",
        teamB: "",
        matchDate: "",
        venue: "",
    });

    const [resultData, setResultData] = useState({
        matchId: "",
        teamAScore: "",
        teamAWickets: "",
        teamAOvers: "",
        teamBScore: "",
        teamBWickets: "",
        teamBOvers: "",
        playerOfTheMatch: "",
    });

    const fetchData = async () => {

        try {

            const matchesResponse =
                await api.get("/matches");

            const teamsResponse =
                await api.get("/teams");

            const tournamentsResponse =
                await api.get("/tournaments");

            setMatches(matchesResponse.data.data || []);
            setTeams(teamsResponse.data.data || []);
            setTournaments(
                tournamentsResponse.data.data || []
            );

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to load match data"
            );

        }

    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleScheduleChange = (e) => {

        setScheduleData({
            ...scheduleData,
            [e.target.name]: e.target.value,
        });

    };

    const handleResultChange = (e) => {

        setResultData({
            ...resultData,
            [e.target.name]: e.target.value,
        });

    };

    const handleScheduleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/matches", scheduleData);

            setMessage("Match scheduled successfully!");

            setScheduleData({
                tournament: "",
                teamA: "",
                teamB: "",
                matchDate: "",
                venue: "",
            });

            setShowScheduleForm(false);

            fetchData();

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to schedule match"
            );

        }

    };

    const handleResultSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                `/matches/${resultData.matchId}/result`,
                {
                    teamAScore: Number(resultData.teamAScore),
                    teamAWickets: Number(resultData.teamAWickets),
                    teamAOvers: Number(resultData.teamAOvers),

                    teamBScore: Number(resultData.teamBScore),
                    teamBWickets: Number(resultData.teamBWickets),
                    teamBOvers: Number(resultData.teamBOvers),

                    playerOfTheMatch:
                        resultData.playerOfTheMatch,
                }
            );

            setMessage("Match result updated successfully!");

            setResultData({
                matchId: "",
                teamAScore: "",
                teamAWickets: "",
                teamAOvers: "",
                teamBScore: "",
                teamBWickets: "",
                teamBOvers: "",
                playerOfTheMatch: "",
            });

            setShowResultForm(false);

            fetchData();

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to update match result"
            );

        }

    };

    const selectedTournamentTeams = teams.filter(team => {

        if (!scheduleData.tournament) {
            return false;
        }

        if (team.tournament?._id) {
            return team.tournament._id ===
                scheduleData.tournament;
        }

        return team.tournament ===
            scheduleData.tournament;
    });

    return (
        <div className="page">

            <div className="container">

                <div className="page-header">

                    <div>
                        <h1>Matches</h1>
                        <p>
                            Schedule matches and record results.
                        </p>
                    </div>

                    {localStorage.getItem("token") && (
                        <div className="action-buttons">

                            <button
                                className="btn"
                                onClick={() => {
                                    setShowScheduleForm(
                                        !showScheduleForm
                                    );
                                    setShowResultForm(false);
                                }}
                            >
                                {showScheduleForm
                                    ? "Close"
                                    : "+ Schedule Match"}
                            </button>

                            <button
                                className="btn result-button"
                                onClick={() => {
                                    setShowResultForm(
                                        !showResultForm
                                    );
                                    setShowScheduleForm(false);
                                }}
                            >
                                {showResultForm
                                    ? "Close"
                                    : "Enter Result"}
                            </button>

                        </div>
                    )}

                </div>

                {message && (
                    <p className="message">
                        {message}
                    </p>
                )}

                {showScheduleForm && (

                    <form
                        className="form tournament-form"
                        onSubmit={handleScheduleSubmit}
                    >

                        <h2>Schedule Match</h2>

                        <div className="form-group">

                            <label>Tournament</label>

                            <select
                                name="tournament"
                                value={scheduleData.tournament}
                                onChange={handleScheduleChange}
                                required
                            >

                                <option value="">
                                    Select Tournament
                                </option>

                                {tournaments.map(tournament => (
                                    <option
                                        key={tournament._id}
                                        value={tournament._id}
                                    >
                                        {tournament.name}
                                    </option>
                                ))}

                            </select>

                        </div>

                        <div className="form-group">

                            <label>Team A</label>

                            <select
                                name="teamA"
                                value={scheduleData.teamA}
                                onChange={handleScheduleChange}
                                required
                            >

                                <option value="">
                                    Select Team A
                                </option>

                                {selectedTournamentTeams.map(team => (
                                    <option
                                        key={team._id}
                                        value={team._id}
                                    >
                                        {team.name}
                                    </option>
                                ))}

                            </select>

                        </div>

                        <div className="form-group">

                            <label>Team B</label>

                            <select
                                name="teamB"
                                value={scheduleData.teamB}
                                onChange={handleScheduleChange}
                                required
                            >

                                <option value="">
                                    Select Team B
                                </option>

                                {selectedTournamentTeams.map(team => (
                                    <option
                                        key={team._id}
                                        value={team._id}
                                    >
                                        {team.name}
                                    </option>
                                ))}

                            </select>

                        </div>

                        <div className="form-group">

                            <label>Match Date</label>

                            <input
                                type="datetime-local"
                                name="matchDate"
                                value={scheduleData.matchDate}
                                onChange={handleScheduleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Venue</label>

                            <input
                                type="text"
                                name="venue"
                                value={scheduleData.venue}
                                onChange={handleScheduleChange}
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn"
                        >
                            Schedule Match
                        </button>

                    </form>
                )}

                {showResultForm && (

                    <form
                        className="form tournament-form"
                        onSubmit={handleResultSubmit}
                    >

                        <h2>Enter Match Result</h2>

                        <div className="form-group">

                            <label>Match</label>

                            <select
                                name="matchId"
                                value={resultData.matchId}
                                onChange={handleResultChange}
                                required
                            >

                                <option value="">
                                    Select Match
                                </option>

                                {matches
                                    .filter(match => !match.result)
                                    .map(match => (

                                        <option
                                            key={match._id}
                                            value={match._id}
                                        >
                                            {match.teamA?.name ||
                                                "Team A"}
                                            {" vs "}
                                            {match.teamB?.name ||
                                                "Team B"}
                                        </option>

                                    ))}

                            </select>

                        </div>

                        <h3>Team A</h3>

                        <div className="score-inputs">

                            <div className="form-group">

                                <label>Runs</label>

                                <input
                                    type="number"
                                    name="teamAScore"
                                    min="0"
                                    value={resultData.teamAScore}
                                    onChange={handleResultChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>Wickets</label>

                                <input
                                    type="number"
                                    name="teamAWickets"
                                    min="0"
                                    max="10"
                                    value={resultData.teamAWickets}
                                    onChange={handleResultChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>Overs</label>

                                <input
                                    type="number"
                                    name="teamAOvers"
                                    min="0"
                                    step="0.1"
                                    value={resultData.teamAOvers}
                                    onChange={handleResultChange}
                                    required
                                />

                            </div>

                        </div>

                        <h3>Team B</h3>

                        <div className="score-inputs">

                            <div className="form-group">

                                <label>Runs</label>

                                <input
                                    type="number"
                                    name="teamBScore"
                                    min="0"
                                    value={resultData.teamBScore}
                                    onChange={handleResultChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>Wickets</label>

                                <input
                                    type="number"
                                    name="teamBWickets"
                                    min="0"
                                    max="10"
                                    value={resultData.teamBWickets}
                                    onChange={handleResultChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>Overs</label>

                                <input
                                    type="number"
                                    name="teamBOvers"
                                    min="0"
                                    step="0.1"
                                    value={resultData.teamBOvers}
                                    onChange={handleResultChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label>Player of the Match</label>

                            <input
                                type="text"
                                name="playerOfTheMatch"
                                value={resultData.playerOfTheMatch}
                                onChange={handleResultChange}
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn"
                        >
                            Submit Result
                        </button>

                    </form>
                )}

                <div className="simple-grid">

                    {matches.length === 0 ? (

                        <p>No matches scheduled.</p>

                    ) : (

                        matches.map(match => (

                            <div
                                className="simple-card"
                                key={match._id}
                            >

                                <h2>
                                    {match.teamA?.name ||
                                        "Team A"}
                                    {" vs "}
                                    {match.teamB?.name ||
                                        "Team B"}
                                </h2>

                                <p>
                                    <strong>Venue:</strong>{" "}
                                    {match.venue}
                                </p>

                                <p>
                                    <strong>Date:</strong>{" "}
                                    {match.matchDate
                                        ? new Date(
                                            match.matchDate
                                        ).toLocaleString()
                                        : "Not specified"}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    {match.status || "Scheduled"}
                                </p>

                                {match.result && (
                                    <p>
                                        <strong>Result:</strong>{" "}
                                        {match.result}
                                    </p>
                                )}

                                {match.playerOfTheMatch && (
                                    <p>
                                        <strong>
                                            Player of the Match:
                                        </strong>{" "}
                                        {match.playerOfTheMatch}
                                    </p>
                                )}

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>
    );
}

export default Matches;