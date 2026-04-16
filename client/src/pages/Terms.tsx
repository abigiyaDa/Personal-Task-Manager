import React from "react";
import "../styles/Terms.css";
import { FaArrowLeft } from "react-icons/fa"; // added back arrow
import { useNavigate } from "react-router-dom";


const Terms: React.FC = () => {
  const navigate = useNavigate();
  return (
      <div className="terms-page">
        <span className="back-arrow" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </span>
        <h1>Terms and Conditions</h1>

        <p>
          By using this application, you agree to the following terms:
        </p>

        <h2>Usage</h2>
        <ul>
          <li>You must provide accurate information when registering</li>
          <li>You are responsible for your account security</li>
        </ul>

        <h2>Tasks & Data</h2>
        <ul>
          <li>You can create, update, and delete your own tasks</li>
          <li>You are responsible for the data you store</li>
        </ul>

        <h2>Account</h2>
        <ul>
          <li>Your account is personal and should not be shared</li>
          <li>We may remove accounts that misuse the system</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>The system is provided "as is"</li>
          <li>We are not responsible for data loss</li>
        </ul>

        <p>By continuing, you accept these terms.</p>
      </div>
  );
};

export default Terms;