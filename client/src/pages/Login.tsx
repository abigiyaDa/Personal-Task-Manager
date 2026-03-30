import signInImage from "../assets/sign-in.png";
import "../styles/login.css";
import { FaUser,FaLock } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/authApi";

export default function Login(){
    const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", form);

      // Save token in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "Login failed");
    }
  };
    return (
        <div className="login-container">
            <div className="login-left">
                <h1>Sign In</h1>

                {error && <p className="error">{error}</p>}

                <div className="input-group">
                    <FaUser className="input-icon"></FaUser>
                    <input type="email" name="email" placeholder="Enter Email" onChange={handleChange}/>
                </div>

                <div className="input-group">
                    <FaLock className="input-icon"></FaLock>
                    <input type="password" name="password" placeholder="Enter Password" onChange={handleChange}/>
                </div>

                <div className="remember">
                    <input type="checkbox" />
                    <span>Remember Me</span>
                </div>

                <button className="login-btn" onClick={handleSubmit}>
                    Login
                </button>

                <p className="register-text">
                    Don't have an account? <a href="/register">Register here</a>
                </p>
            </div>

            <div className="login-right">
                <img src={signInImage} alt="Sign In" className="login-image"/>
            </div>
        </div>
    )
}