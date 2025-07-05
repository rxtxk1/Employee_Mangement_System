import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import axios from "axios";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/summary", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSummary(response.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.error(error.message);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return (
      <div className="p-10 text-center text-gray-500 text-lg animate-pulse">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">📊 Dashboard Overview</h2>
      <p className="text-sm text-gray-500 mb-8">Here’s what’s happening in your organization</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Monthly Salary"
          number={summary.totalSalary}
          color="bg-red-600"
        />
      </div>

      <div className="mt-14">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-1">📝 Leave Summary</h3>
        <p className="text-sm text-gray-500 text-center mb-8">
          Track leave requests & approval status
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={summary.leaveSummary.appliedFor}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
            color="bg-green-600"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={summary.leaveSummary.pending}
            color="bg-yellow-600"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={summary.leaveSummary.rejected}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
