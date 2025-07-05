import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { columns, LeaveButtons } from '../../utils/LeaveHelper';
import axios from 'axios';

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  return (
    <>
      {filteredLeaves ? (
        <div className="p-6 min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-4xl font-extrabold text-gray-800 tracking-tight">📋 Manage All Leaves</h3>
            <p className="text-sm text-gray-500 mt-1">Filter, search, and review leave requests</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <input
              type="text"
              placeholder="Search by Employee ID"
              onChange={filterByInput}
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
            />
            <div className="flex gap-3 w-full md:w-auto justify-center">
              <button
                onClick={() => filterByButton("Pending")}
                className="px-4 py-2 rounded-lg bg-yellow-100 text-yellow-800 font-semibold hover:bg-yellow-200 transition"
              >
                Pending
              </button>
              <button
                onClick={() => filterByButton("Approved")}
                className="px-4 py-2 rounded-lg bg-green-100 text-green-800 font-semibold hover:bg-green-200 transition"
              >
                Approved
              </button>
              <button
                onClick={() => filterByButton("Rejected")}
                className="px-4 py-2 rounded-lg bg-red-100 text-red-800 font-semibold hover:bg-red-200 transition"
              >
                Rejected
              </button>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl shadow-lg p-4 overflow-x-auto">
            <DataTable
              columns={columns}
              data={filteredLeaves}
              pagination
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: '#f9fafb',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: '#374151',
                  },
                },
                rows: {
                  style: {
                    fontSize: '14px',
                    minHeight: '56px',
                  },
                },
              }}
            />
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-gray-500 animate-pulse">Loading leave data...</div>
      )}
    </>
  );
};

export default Table;
