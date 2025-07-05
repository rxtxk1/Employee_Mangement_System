import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = async (id) => {
    setDepartments((prev) => {
      const updated = prev.filter((dep) => dep._id !== id);
      setFilteredDepartments(updated);
      return updated;
    });
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/department', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete} />,
          }));
          setDepartments(data);
          setFilteredDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const query = e.target.value.toLowerCase();
    const results = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(query)
    );
    setFilteredDepartments(results);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="text-center mb-10">
        <h3 className="text-4xl font-extrabold text-gray-800">🏢 Manage Departments</h3>
        <p className="text-sm text-gray-500 mt-1">Search, add, or manage your company departments</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by Department Name"
          onChange={filterDepartments}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
        />
        <Link
          to="/admin-dashboard/add-department"
          className="w-full md:w-auto px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow hover:bg-teal-700 transition-all"
        >
          ➕ Add New Department
        </Link>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg p-4">
        <DataTable
          columns={columns}
          data={filteredDepartments}
          progressPending={depLoading}
          pagination
          customStyles={{
            headCells: {
              style: {
                backgroundColor: "#f9fafb",
                fontWeight: "600",
                fontSize: "14px",
                color: "#374151",
              },
            },
            rows: {
              style: {
                fontSize: "14px",
                minHeight: "56px",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default DepartmentList;
