import { FaUserCircle, FaTachometerAlt, FaTasks, FaPlus, FaCalendarAlt, FaCog, FaQuestionCircle, FaSignOutAlt, FaSearch, FaBell } from "react-icons/fa";
import "../styles/Navbar.css";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";


interface Props {
  children: ReactNode;
}

const Navbar: React.FC<Props> = ({ children }) => {
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
            <span className="date">Tuesday 20/06/2023</span>
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