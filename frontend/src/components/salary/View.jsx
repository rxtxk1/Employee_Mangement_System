import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const View = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  let sno = 1;

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/salary/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (e) => {
    const query = e.target.value;
    const filtered = salaries.filter((item) =>
      item.employeeId.employeeId
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredSalaries(filtered);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
          Salary History
        </h2>

        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search by Emp ID"
            onChange={filterSalaries}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {filteredSalaries === null ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : filteredSalaries.length === 0 ? (
          <div className="text-center text-gray-600">No Records Found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded">
              <thead className="bg-green-100 text-gray-700 text-sm uppercase">
                <tr>
                  <th className="py-2 px-4 border">S.No</th>
                  <th className="py-2 px-4 border">Emp ID</th>
                  <th className="py-2 px-4 border">Salary</th>
                  <th className="py-2 px-4 border">Allowance</th>
                  <th className="py-2 px-4 border">Deduction</th>
                  <th className="py-2 px-4 border">Total</th>
                  <th className="py-2 px-4 border">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary) => (
                  <tr
                    key={salary._id}
                    className="text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <td className="py-2 px-4 border text-center">{sno++}</td>
                    <td className="py-2 px-4 border">
                      {salary.employeeId.employeeId}
                    </td>
                    <td className="py-2 px-4 border">{salary.basicSalary}</td>
                    <td className="py-2 px-4 border">{salary.allowances}</td>
                    <td className="py-2 px-4 border">{salary.deductions}</td>
                    <td className="py-2 px-4 border">{salary.netSalary}</td>
                    <td className="py-2 px-4 border">
                      {new Date(salary.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default View;
