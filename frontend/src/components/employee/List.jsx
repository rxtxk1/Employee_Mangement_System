import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/EmployeeHelper";
import axios from "axios";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                width={40}
                className="rounded-full shadow"
                src={`http://localhost:5000/${emp.userId.profileImage}`}
                alt="Profile"
              />
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-4xl font-extrabold text-gray-800 tracking-tight">👨‍💼 Manage Employees</h3>
        <p className="text-sm text-gray-500 mt-1">Search, view, and manage your team</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 md:flex md:justify-between md:items-center gap-4">
        <input
          type="text"
          placeholder="Search by employee name"
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
          onChange={handleFilter}
        />

        <Link
          to="/admin-dashboard/add-employee"
          className="mt-4 md:mt-0 inline-block px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-all"
        >
          ➕ Add New Employee
        </Link>
      </div>

      <div className="mt-8 rounded-xl overflow-hidden shadow-lg bg-white p-4">
        <DataTable
          columns={columns}
          data={filteredEmployee}
          progressPending={empLoading}
          pagination
          customStyles={{
            headCells: {
              style: {
                backgroundColor: "#f7f7f7",
                fontWeight: "bold",
                fontSize: "14px",
              },
            },
            rows: {
              style: {
                fontSize: "14px",
                minHeight: "60px",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default List;
