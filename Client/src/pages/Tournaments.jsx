import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Tournaments() {

    const [tournaments, setTournaments] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        format: "T20",
        venue: "",
        numberOfTeams: "",
        status: "Upcoming",
    });

    const [message, setMessage] = useState("");

    const fetchTournaments = async () => {

        try {

            const response = await api.get("/tournaments");

            setTournaments(response.data.data || []);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to load tournaments"
            );

        }

    };

    useEffect(() => {
        fetchTournaments();
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

            await api.post("/tournaments", {
                ...formData,
                numberOfTeams: Number(formData.numberOfTeams),
            });

            setMessage("Tournament created successfully!");

            setFormData({
                name: "",
                format: "T20",
                venue: "",
                numberOfTeams: "",
                status: "Upcoming",
            });

            setShowForm(false);

            fetchTournaments();

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to create tournament"
            );

        }

    };

    return (
        <div className="page">

            <div className="container">

                <div className="page-header">

                    <div>
                        <h1>Tournaments</h1>
                        <p>Manage your cricket tournaments.</p>
                    </div>

                    {localStorage.getItem("token") && (
                        <button
                            className="btn"
                            onClick={() => setShowForm(!showForm)}
                        >
                            {showForm
                                ? "Close"
                                : "+ Create Tournament"}
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

                        <h2>Create Tournament</h2>

                        <div className="form-group">

                            <label>Name</label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Format</label>

                            <select
                                name="format"
                                value={formData.format}
                                onChange={handleChange}
                            >
                                <option value="T10">T10</option>
                                <option value="T20">T20</option>
                                <option value="ODI">ODI</option>
                                <option value="Test">Test</option>
                            </select>

                        </div>

                        <div className="form-group">

                            <label>Venue</label>

                            <input
                                type="text"
                                name="venue"
                                value={formData.venue}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Number of Teams</label>

                            <input
                                type="number"
                                name="numberOfTeams"
                                value={formData.numberOfTeams}
                                onChange={handleChange}
                                min="2"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Status</label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Upcoming">
                                    Upcoming
                                </option>

                                <option value="Ongoing">
                                    Ongoing
                                </option>

                                <option value="Completed">
                                    Completed
                                </option>
                            </select>

                        </div>

                        <button
                            type="submit"
                            className="btn"
                        >
                            Create Tournament
                        </button>

                    </form>
                )}

                <div className="tournament-grid">

                    {tournaments.length === 0 ? (

                        <p>No tournaments found.</p>

                    ) : (

                        tournaments.map((tournament) => (

                            <div
                                className="tournament-card"
                                key={tournament._id}
                            >

                                <h2>{tournament.name}</h2>

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
                                    to={`/tournaments/${tournament._id}`}
                                    className="btn view-btn"
                                >
                                    View Tournament
                                </Link>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>
    );
}

export default Tournaments;