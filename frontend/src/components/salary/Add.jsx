import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });

  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {departments ? (
        <div className="max-w-5xl mx-auto mt-10 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-10 rounded-xl shadow-xl">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
            💰 Add Salary Details
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Department */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Department
                </label>
                <select
                  name="department"
                  onChange={handleDepartment}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Employee */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Employee
                </label>
                <select
                  name="employeeId"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>

              {/* Basic Salary */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Basic Salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  onChange={handleChange}
                  placeholder="Enter basic salary"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition"
                  required
                />
              </div>

              {/* Allowances */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Allowances
                </label>
                <input
                  type="number"
                  name="allowances"
                  onChange={handleChange}
                  placeholder="Enter allowances"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition"
                  required
                />
              </div>

              {/* Deductions */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                  onChange={handleChange}
                  placeholder="Enter deductions"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition"
                  required
                />
              </div>

              {/* Pay Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Pay Date
                </label>
                <input
                  type="date"
                  name="payDate"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-10 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg shadow transition-all duration-200"
            >
              ➕ Add Salary
            </button>
          </form>
        </div>
      ) : (
        <div className="p-10 text-center text-gray-500 text-lg animate-pulse">
          Loading departments...
        </div>
      )}
    </>
  );
};

export default Add;
