import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'

const SummaryCard = () => {
  const { user } = useAuth()

  return (
    <div className="p-6">
      <div className="flex items-center bg-white shadow-md rounded-xl p-4 transition-transform hover:scale-[1.01] hover:shadow-lg">
        <div className="flex justify-center items-center bg-green-600 text-white w-14 h-14 rounded-full text-2xl">
          <FaUser />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-500 font-medium">Welcome back,</p>
          <p className="text-xl font-bold text-gray-800">{user.name}</p>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard
