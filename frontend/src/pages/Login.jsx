import axios from 'axios'
import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
       
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email, password }
        );
        if(response.data.success) {
          login(response.data.user)
          localStorage.setItem("token", response.data.token)
          if(response.data.user.role === "admin") {
             navigate('/admin-dashboard')
          } else {
            navigate("/employee-dashboard")
          }
        }
      } catch(error) {
        if(error.response && !error.response.data.success) {
          setError(error.response.data.error)
        } else {
          setError("Server Error")
        }
      }
    };

  return (
    <div className="flex h-screen w-screen">
  {/* Left Side */}
  <div className="w-1/2 bg-green-700 relative overflow-hidden flex items-center justify-center">
    <img
      src="/public/mailimg.jpg"
      alt="solar background"
      className="absolute inset-0 w-full h-full object-cover opacity-20"
    />
    <div className="relative z-10 text-center px-8">
      <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">PrimeTower Infra</h1>
      <p className="text-xl mt-4 text-white italic">Powering tomorrow with Solar Energy</p>
    </div>
  </div>

  {/* Right Side */}
  <div className="w-1/2 flex items-center justify-center bg-gray-50">
    <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
        Employee Management System
      </h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="*****"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm mb-4">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-green-600" />
            <span className="ml-2 text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-green-600 hover:underline">Forgot password?</a>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</div>
)
}

export default Login
