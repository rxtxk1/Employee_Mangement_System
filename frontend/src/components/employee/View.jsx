import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <>
      {employee ? (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-xl">
          <h2 className="text-3xl font-extrabold text-green-700 text-center mb-10">
            Employee Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Profile Image */}
            <div className="flex justify-center">
              <img
                src={`http://localhost:5000/${employee.userId.profileImage}`}
                alt="Profile"
                className="w-64 h-64 rounded-full border-4 border-green-600 shadow-lg object-cover"
              />
            </div>

            {/* Info Section */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <p className="font-semibold text-gray-700 w-40">Name:</p>
                <p className="text-gray-900">{employee.userId.name}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold text-gray-700 w-40">Employee ID:</p>
                <p className="text-gray-900">{employee.employeeId}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold text-gray-700 w-40">Date of Birth:</p>
                <p className="text-gray-900">
                  {new Date(employee.dob).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold text-gray-700 w-40">Gender:</p>
                <p className="text-gray-900">{employee.gender}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold text-gray-700 w-40">Department:</p>
                <p className="text-gray-900">{employee.department.dep_name}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold text-gray-700 w-40">Marital Status:</p>
                <p className="text-gray-900">{employee.maritalStatus}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-gray-600">Loading...</div>
      )}
    </>
  );
};

export default View;
