import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [leave, setLeave] = useState({
    userId: user._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/leave/add`,
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        navigate(`/employee-dashboard/leaves/${user._id}`);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Request for Leave
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">

            {/* Leave Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Leave Type
              </label>
              <select
                name="leaveType"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="">Select Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Annual Leave">Annual Leave</option>
              </select>
            </div>

            {/* From & To Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Reason / Description
              </label>
              <textarea
                name="reason"
                required
                rows="4"
                placeholder="Enter reason for leave"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow transition duration-200"
              >
                Submit Leave Request
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
