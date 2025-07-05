import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleOld = () => setShowOld(!showOld);
  const toggleNew = () => setShowNew(!showNew);
  const toggleConfirm = () => setShowConfirm(!showConfirm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Passwords do not match");
    } else {
      try {
        const response = await axios.put(
          "http://localhost:5000/api/setting/change-password",
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          navigate("/admin-dashboard/employees");
          setError("");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 bg-white px-10 py-12 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center tracking-tight">
        🔐 Update Password
      </h2>
      <p className="text-center text-gray-500 mb-6 text-sm">
        Make your account more secure by updating your password regularly.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Old Password */}
        <div className="relative">
          <label className="text-sm font-medium text-gray-600 block mb-1">
            Old Password
          </label>
          <input
            type={showOld ? "text" : "password"}
            name="oldPassword"
            placeholder="Enter current password"
            onChange={handleChange}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            required
          />
          <div
            onClick={toggleOld}
            className="absolute right-3 top-[42px] cursor-pointer text-gray-500 hover:text-gray-700"
          >
            {showOld ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        {/* New Password */}
        <div className="relative">
          <label className="text-sm font-medium text-gray-600 block mb-1">
            New Password
          </label>
          <input
            type={showNew ? "text" : "password"}
            name="newPassword"
            placeholder="Enter new password"
            onChange={handleChange}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            required
          />
          <div
            onClick={toggleNew}
            className="absolute right-3 top-[42px] cursor-pointer text-gray-500 hover:text-gray-700"
          >
            {showNew ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="text-sm font-medium text-gray-600 block mb-1">
            Confirm Password
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm new password"
            onChange={handleChange}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            required
          />
          <div
            onClick={toggleConfirm}
            className="absolute right-3 top-[42px] cursor-pointer text-gray-500 hover:text-gray-700"
          >
            {showConfirm ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Setting;
