import Navbar from "../components/Navbar";
import "../styles/Terms.css";

function Terms() {
  return (
    <Navbar>
      <div className="terms-page">
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
    </Navbar>
  );
}

export default Terms;