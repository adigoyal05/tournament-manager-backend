import { useEffect, useState } from "react";
import api from "../services/api";

function Teams() {

    const [teams, setTeams] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        captain: "",
        players: "",
        tournament: "",
    });

    const fetchData = async () => {

        try {

            const teamsResponse =
                await api.get("/teams");

            const tournamentsResponse =
                await api.get("/tournaments");

            setTeams(teamsResponse.data.data || []);
            setTournaments(
                tournamentsResponse.data.data || []
            );

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to load data"
            );

        }

    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const playersArray =
                formData.players
                    .split(",")
                    .map(player => player.trim())
                    .filter(player => player !== "");

            await api.post("/teams", {
                name: formData.name,
                captain: formData.captain,
                players: playersArray,
                tournament: formData.tournament,
            });

            setMessage("Team created successfully!");

            setFormData({
                name: "",
                captain: "",
                players: "",
                tournament: "",
            });

            setShowForm(false);

            fetchData();

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to create team"
            );

        }

    };

    return (
        <div className="page">

            <div className="container">

                <div className="page-header">

                    <div>
                        <h1>Teams</h1>
                        <p>Manage tournament teams.</p>
                    </div>

                    {localStorage.getItem("token") && (
                        <button
                            className="btn"
                            onClick={() =>
                                setShowForm(!showForm)
                            }
                        >
                            {showForm
                                ? "Close"
                                : "+ Add Team"}
                        </button>
                    )}

                </div>

                {message && (
                    <p className="message">
                        {message}
                    </p>
                )}

                {showForm && (

                    <form
                        className="form tournament-form"
                        onSubmit={handleSubmit}
                    >

                        <h2>Add Team</h2>

                        <div className="form-group">

                            <label>Team Name</label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Captain</label>

                            <input
                                type="text"
                                name="captain"
                                value={formData.captain}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Players</label>

                            <input
                                type="text"
                                name="players"
                                value={formData.players}
                                onChange={handleChange}
                                placeholder="Player 1, Player 2, Player 3"
                            />

                        </div>

                        <div className="form-group">

                            <label>Tournament</label>

                            <select
                                name="tournament"
                                value={formData.tournament}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Tournament
                                </option>

                                {tournaments.map(
                                    tournament => (
                                        <option
                                            key={tournament._id}
                                            value={tournament._id}
                                        >
                                            {tournament.name}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                        <button
                            type="submit"
                            className="btn"
                        >
                            Add Team
                        </button>

                    </form>
                )}

                <div className="simple-grid">

                    {teams.length === 0 ? (

                        <p>No teams found.</p>

                    ) : (

                        teams.map(team => (

                            <div
                                className="simple-card"
                                key={team._id}
                            >

                                <h2>{team.name}</h2>

                                <p>
                                    <strong>Captain:</strong>{" "}
                                    {team.captain}
                                </p>

                                <p>
                                    <strong>Players:</strong>{" "}
                                    {team.players?.length || 0}
                                </p>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>
    );
}

export default Teams;