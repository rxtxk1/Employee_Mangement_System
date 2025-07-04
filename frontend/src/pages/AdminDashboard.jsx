import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSummary from '../components/dashboard/AdminSummary'

const AdminDashboard = () => {
  const {user} = useAuth()
  const navigate = useNavigate()
  if(!user) {
    navigate('/login') 
  }
  return (
    <div className='flex'>
      <AdminSidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
         <Navbar />
         <Outlet />
      </div> 
    </div>
  )
}

export default AdminDashboard
