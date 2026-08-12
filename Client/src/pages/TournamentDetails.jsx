import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function TournamentDetails() {

    const { id } = useParams();

    const [tournament, setTournament] = useState(null);
    const [teams, setTeams] = useState([]);
    const [matches, setMatches] = useState([]);
    const [message, setMessage] = useState("");

    const fetchData = async () => {

        try {

            const tournamentResponse =
                await api.get(`/tournaments/${id}`);

            const teamsResponse =
                await api.get(`/teams/tournament/${id}`);

            const matchesResponse =
                await api.get("/matches");

            setTournament(tournamentResponse.data.data);
            setTeams(teamsResponse.data.data || []);

            const tournamentMatches =
                (matchesResponse.data.data || []).filter(
                    match =>
                        match.tournament?._id === id ||
                        match.tournament === id
                );

            setMatches(tournamentMatches);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to load tournament"
            );

        }

    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (message) {
        return (
            <div className="page">
                <div className="container">
                    <p>{message}</p>
                </div>
            </div>
        );
    }

    if (!tournament) {
        return (
            <div className="page">
                <div className="container">
                    <p>Loading tournament...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page">

            <div className="container">

                <div className="tournament-details">

                    <h1>{tournament.name}</h1>

                    <p>
                        <strong>Format:</strong>{" "}
                        {tournament.format}
                    </p>

                    <p>
                        <strong>Venue:</strong>{" "}
                        {tournament.venue}
                    </p>

                    <p>
                        <strong>Teams:</strong>{" "}
                        {tournament.numberOfTeams}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        {tournament.status}
                    </p>

                    <Link
                        to={`/points-table/${id}`}
                        className="btn"
                    >
                        View Points Table
                    </Link>

                </div>

                <section className="details-section">

                    <h2>Teams</h2>

                    {teams.length === 0 ? (

                        <p>No teams added yet.</p>

                    ) : (

                        <div className="simple-grid">

                            {teams.map((team) => (

                                <div
                                    className="simple-card"
                                    key={team._id}
                                >

                                    <h3>{team.name}</h3>

                                    <p>
                                        Captain: {team.captain}
                                    </p>

                                    <p>
                                        Players:{" "}
                                        {team.players?.length || 0}
                                    </p>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

                <section className="details-section">

                    <h2>Matches</h2>

                    {matches.length === 0 ? (

                        <p>No matches scheduled yet.</p>

                    ) : (

                        <div className="simple-grid">

                            {matches.map((match) => (

                                <div
                                    className="simple-card"
                                    key={match._id}
                                >

                                    <h3>
                                        {match.teamA?.name ||
                                            "Team A"}
                                        {" vs "}
                                        {match.teamB?.name ||
                                            "Team B"}
                                    </h3>

                                    <p>
                                        Venue: {match.venue}
                                    </p>

                                    <p>
                                        Status: {match.status}
                                    </p>

                                    {match.result && (
                                        <p>
                                            Result: {match.result}
                                        </p>
                                    )}

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </div>

        </div>
    );
}

export default TournamentDetails;