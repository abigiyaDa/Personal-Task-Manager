import { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/Settings.css";
import API from "../api/authApi";

function Settings() {
  const [nightMode, setNightMode] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        name: parsedUser.name,
        email: parsedUser.email,
        username: parsedUser.name, // or create username in DB later
      });
    }
  }, []);
  const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");
    await API.put("/users/update", user, {
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated");
  } catch (err) {
    console.error(err);
  }
};

  return (
    <Navbar>
      <div className="settings-page">
        {/* Top Profile Section */}
        <div className="profile-card">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="profile"
            className="profile-img"
          />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>

        {/* Settings Form */}
        <div className="settings-form">
          <h3>User Settings</h3>

          <label>Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <label>Username</label>
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />

          {/* Night Mode Toggle */}
          <div className="toggle-row">
            <span>Night Mode</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={nightMode}
                onChange={() => setNightMode(!nightMode)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <button className="save-btn" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </Navbar>
  );
}

export default Settings;