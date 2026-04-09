import { FaUserCircle, FaTachometerAlt, FaTasks, FaPlus, FaCalendarAlt, FaCog, FaQuestionCircle, FaSignOutAlt, FaSearch, FaBell } from "react-icons/fa";
import "../styles/navbar.css";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import React, { useEffect,useState } from "react";

interface Props {
  children: ReactNode;
}

const Navbar: React.FC<Props> = ({ children }) => {
  const today = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = days[today.getDay()];
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const [isOpen, setIsOpen] = useState(true);

  const formattedDate = `${dayName} ${day}/${month}/${year}`;
  
  const [dueTodayCount, setDueTodayCount] = useState(0);useEffect(() => {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]") as { dueDate: string }[];
  const todayKey = `${year}-${month}-${day}`; // YYYY-MM-DD
  const count = tasks.filter(task => task.dueDate === todayKey).length;
  setDueTodayCount(count);
}, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    localStorage.removeItem("user");  // remove stored user info (optional)
    window.location.href = "/login";  // redirect to login page
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
       <div className="profile">
  <FaUserCircle className="profile-icon" />
  <h3>{localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).name : "User"}</h3>
  <p>{localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).email : "user@example.com"}</p>
</div>

        <ul className="menu">
          <li>
            <NavLink to="/dashboard">
              <FaTachometerAlt /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks">
              <FaTasks /> My Task
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-task">
              <FaPlus /> Add Task
            </NavLink>
          </li>
          <li>
            <NavLink to="/category">
              <FaPlus /> Category
            </NavLink>
          </li>
          <li>
            <NavLink to="/calendar">
              <FaCalendarAlt /> Calendar
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings">
              <FaCog /> Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/help">
              <FaQuestionCircle /> Help
            </NavLink>
          </li>
          <li>
            {/* ✅ Logout button */}
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className={`main-content ${isOpen ? "shifted" : "full"}`}>
        {/* Topbar */}
        <div className="topbar">
          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="search-box">
            <FaSearch className="icon" />
            <input type="text" placeholder="Search your task here..." />
          </div>

          <div className="top-icons">
            <NavLink to="/calendar">
              <FaCalendarAlt className="icon" />
            </NavLink>
            <div className="notification-wrapper">
  <FaBell className="icon" />
  {dueTodayCount > 0 && <span className="notification-badge">{dueTodayCount}</span>}
</div>
            <span className="date">{formattedDate}</span>
          </div>
        </div>

        {/* Page content */}
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default Navbar;