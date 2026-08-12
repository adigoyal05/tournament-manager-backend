import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home">

            <section className="hero">

                <div className="container">

                    <h1>
                        Cricket Tournament Manager
                    </h1>

                    <p>
                        Manage tournaments, teams, matches
                        and points tables in one place.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/tournaments"
                            className="btn"
                        >
                            View Tournaments
                        </Link>

                        <Link
                            to="/register"
                            className="btn secondary-btn"
                        >
                            Get Started
                        </Link>

                    </div>

                </div>

            </section>

            <section className="features container">

                <div className="feature-card">
                    <h3>🏆 Tournaments</h3>
                    <p>
                        Create and manage cricket tournaments.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>👥 Teams</h3>
                    <p>
                        Manage teams, captains and players.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>🏏 Matches</h3>
                    <p>
                        Schedule matches and record results.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>📊 Points Table</h3>
                    <p>
                        Automatically track points and NRR.
                    </p>
                </div>

            </section>

        </div>
    );
}

export default Home;