import { FaUserCircle, FaTachometerAlt, FaTasks, FaPlus, FaCalendarAlt, FaCog, FaQuestionCircle, FaSignOutAlt, FaSearch, FaBell } from "react-icons/fa";
import "../App.css";

const Navbar = () => {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Profile */}
        <div className="profile">
          <FaUserCircle className="profile-icon" />   
          <h3>amanuel</h3>
          <p>amanuel@gmail.com</p>
        </div>

        {/* Menu */}
        <ul className="menu">
          <li><FaTachometerAlt /> Dashboard</li>
          <li><FaTasks /> My Task</li>
          <li><FaPlus /> Add Task</li>
          <li><FaCalendarAlt /> Calendar</li>
          <li><FaCog /> Settings</li>
          <li><FaQuestionCircle /> Help</li>
          <li><FaSignOutAlt /> Logout</li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Topbar */}
        <div className="topbar">
          {/* Search */}
          <div className="search-box">
            <FaSearch className="icon" />
            <input type="text" placeholder="Search your task here..." />
          </div>

          {/* Right side icons */}
          <div className="top-icons">
            <FaCalendarAlt className="icon" />
            <FaBell className="icon" />
            <span className="date">Tuesday 20/06/2023</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;