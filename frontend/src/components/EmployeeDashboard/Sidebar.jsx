import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const Sidebar = () => {
  const { user } = useAuth();

  const navLinkClasses = ({ isActive }) =>
    `${
      isActive ? "bg-green-600 text-white" : "hover:bg-gray-700"
    } flex items-center space-x-3 py-2 px-4 rounded transition duration-200`;

  return (
    <div className="bg-gray-900 text-white h-screen fixed top-0 left-0 w-64 shadow-xl z-40">
      {/* Logo / Header */}
      <div className="bg-gray-100 h-16 flex items-center justify-center px-4 shadow-md">
        <img
          src="/new_logo.jpg"
          alt="Company Logo"
          className="h-14 w-full"
        />
      </div>

      {/* Navigation Links */}
      <div className="px-4 mt-4 space-y-2">
        <NavLink to="/employee-dashboard" className={navLinkClasses} end>
          <FaTachometerAlt className="text-lg" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={navLinkClasses}
        >
          <FaUsers className="text-lg" />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          className={navLinkClasses}
        >
          <FaBuilding className="text-lg" />
          <span>Leaves</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={navLinkClasses}
        >
          <FaCalendarAlt className="text-lg" />
          <span>Salary</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/setting"
          className={navLinkClasses}
        >
          <FaCogs className="text-lg" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
