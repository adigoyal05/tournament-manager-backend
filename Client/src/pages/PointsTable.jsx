import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function PointsTable() {

    const { id } = useParams();

    const [teams, setTeams] = useState([]);
    const [tournament, setTournament] = useState(null);
    const [message, setMessage] = useState("");

    const fetchData = async () => {

        try {

            const tournamentResponse =
                await api.get(`/tournaments/${id}`);

            const teamsResponse =
                await api.get(`/teams/tournament/${id}`);

            setTournament(tournamentResponse.data.data);

            const teamData = teamsResponse.data.data || [];

            const sortedTeams = [...teamData].sort((a, b) => {

                if ((b.points || 0) !== (a.points || 0)) {
                    return (b.points || 0) - (a.points || 0);
                }

                return (b.nrr || 0) - (a.nrr || 0);
            });

            setTeams(sortedTeams);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to load points table"
            );

        }

    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <div className="page">

            <div className="container">

                {message && (
                    <p className="message">
                        {message}
                    </p>
                )}

                {tournament && (
                    <div className="points-header">

                        <h1>{tournament.name}</h1>

                        <p>
                            {tournament.format} •{" "}
                            {tournament.venue}
                        </p>

                    </div>
                )}

                <div className="points-table-wrapper">

                    <table className="points-table">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Team</th>
                                <th>Played</th>
                                <th>Won</th>
                                <th>Lost</th>
                                <th>Draw</th>
                                <th>NRR</th>
                                <th>Points</th>
                            </tr>
                        </thead>

                        <tbody>

                            {teams.length === 0 ? (

                                <tr>
                                    <td colSpan="8">
                                        No teams found.
                                    </td>
                                </tr>

                            ) : (

                                teams.map((team, index) => (

                                    <tr key={team._id}>

                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>
                                            <strong>
                                                {team.name}
                                            </strong>
                                        </td>

                                        <td>
                                            {team.matchesPlayed || 0}
                                        </td>

                                        <td>
                                            {team.wins || 0}
                                        </td>

                                        <td>
                                            {team.losses || 0}
                                        </td>

                                        <td>
                                            {team.draws || 0}
                                        </td>

                                        <td>
                                            {Number(
                                                team.nrr || 0
                                            ).toFixed(3)}
                                        </td>

                                        <td>
                                            <strong>
                                                {team.points || 0}
                                            </strong>
                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default PointsTable;