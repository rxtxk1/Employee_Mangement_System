import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <div className="sticky top-0 left-64 z-30 h-16 bg-white shadow flex items-center justify-between px-6 border-b border-gray-200">
      <p className="text-gray-700 font-semibold text-base">Welcome, {user.name}</p>
      <button
        onClick={logout}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-sm font-medium transition duration-200"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
