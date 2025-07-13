import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-gray-900 text-white h-screen fixed left-0 top-0 w-64 shadow-xl z-40">
      {/* Logo */}
      <div className="bg-gray-100 h-16 flex items-center justify-center px-4 shadow-md">
        <img
          src="/new_logo.jpg"
          alt="Company Logo"
          className="h-14 w-full"
        />
      </div>

      {/* Navigation Links */}
      <div className="mt-4 space-y-1 px-4">
        <NavItem to="/admin-dashboard" icon={<FaTachometerAlt />} label="Dashboard" />
        <NavItem to="/admin-dashboard/employees" icon={<FaUsers />} label="Employee" />
        <NavItem to="/admin-dashboard/departments" icon={<FaBuilding />} label="Department" />
        <NavItem to="/admin-dashboard/leaves" icon={<FaCalendarAlt />} label="Leave" />
        <NavItem to="/admin-dashboard/salary/add" icon={<FaMoneyBillWave />} label="Salary" />
        <NavItem to="/admin-dashboard/attendance" icon={<FaRegCalendarAlt />} label="Attendance" />
        <NavItem to="/admin-dashboard/attendance-report" icon={<AiOutlineFileText />} label="Attendance Report" />
        <NavItem to="/admin-dashboard/setting" icon={<FaCogs />} label="Setting" />
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `${isActive ? "bg-green-600" : "hover:bg-gray-800"} flex items-center space-x-3 py-2.5 px-4 rounded-md transition duration-150`
    }
    end
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </NavLink>
);

export default AdminSidebar;
