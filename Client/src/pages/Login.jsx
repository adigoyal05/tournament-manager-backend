import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            if (response.data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
            }

            navigate("/tournaments");

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Login failed"
            );

        }

    };

    return (
        <div className="page">

            <form className="form" onSubmit={handleSubmit}>

                <h2>Login</h2>

                <div className="form-group">

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                </div>

                <button className="btn" type="submit">
                    Login
                </button>

                {message && <p>{message}</p>}

            </form>

        </div>
    );
}

export default Login;