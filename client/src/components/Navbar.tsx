import { FaUserCircle, FaTachometerAlt, FaTasks, FaPlus, FaCalendarAlt, FaCog, FaQuestionCircle, FaSignOutAlt, FaSearch, FaBell } from "react-icons/fa";
import "../styles/navbar.css";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";


interface Props {
  children: ReactNode;
}

const Navbar: React.FC<Props> = ({ children }) => {
  const today = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  //format the : date dd/mm/yyyy
  const dayName = days[today.getDay()]; // returns 0-6
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // month is 0-based
  const year = today.getFullYear();

  const formattedDate = `${dayName} ${day}/${month}/${year}`;
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile">
          <FaUserCircle className="profile-icon" />   
          <h3>amanuel</h3>
          <p>amanuel@gmail.com</p>
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
            <NavLink to="/logout">
              <FaSignOutAlt /> Logout
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Topbar */}
        <div className="topbar">
          <div className="search-box">
            <FaSearch className="icon" />
            <input type="text" placeholder="Search your task here..." />
          </div>

          <div className="top-icons">
            <NavLink to='/calendar'><FaCalendarAlt className="icon" /> </NavLink>
            <FaBell className="icon" />
            <span className="date">{formattedDate}</span>
          </div>
        </div>

        {/* THIS IS WHERE DASHBOARD GOES */}
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Navbar;