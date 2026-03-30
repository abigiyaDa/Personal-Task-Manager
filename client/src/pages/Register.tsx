import React, { useState } from "react";
import illustration from "../assets/sign-up.png";
import "../styles/register.css";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/authApi"; // import API helper

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        name: form.fullName,
        email: form.email,
        password: form.password,
      });

      alert("Registration successful!");
      navigate("/login");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="reg-container">
      <div className="reg-left">
        <img src={illustration} alt="signup visual" />
      </div>
      <div className="reg-right">
        <h2>Sign Up</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Enter Full Name"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          <div className="terms">
            <input type="checkbox" />
            <span>I agree to all terms</span>
          </div>

          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;