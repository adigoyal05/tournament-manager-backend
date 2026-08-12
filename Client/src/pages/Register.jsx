import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
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

            await api.post("/auth/register", formData);

            setMessage("Registration successful!");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Registration failed"
            );

        }

    };

    return (
        <div className="page">

            <form className="form" onSubmit={handleSubmit}>

                <h2>Create Account</h2>

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
                    Register
                </button>

                {message && <p>{message}</p>}

            </form>

        </div>
    );
}

export default Register;