import React, { useState } from "react";
import illustration from "../assets/sign-up.png";
import "../styles/register.css";
import { Link } from "react-router-dom";


const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    // later connect to API
  };

  return (
    <div className="reg-container">
      {/* LEFT IMAGE */}
      <div className="reg-left">
        <img src={illustration} alt="signup visual" />
      </div>

      {/* RIGHT FORM */}
      <div className="reg-right">
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
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
           Already have an account?{" "}
           <Link to="/login" className="link">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;