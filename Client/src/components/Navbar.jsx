import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="nav-container">

                <Link to="/" className="logo">
                    Cricket Manager
                </Link>

                <div className="nav-links">

                    <Link to="/">Home</Link>

                    <Link to="/tournaments">
                        Tournaments
                    </Link>

                    <Link to="/teams">
                        Teams
                    </Link>

                    <Link to="/matches">
                        Matches
                    </Link>

                    {token ? (
                        <button
                            className="nav-button"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/register">
                                Register
                            </Link>
                        </>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;