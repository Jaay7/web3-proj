import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'
import NavBar from './../../layouts/NavBar';

const Dashboard = () => {

  // if (localStorage.getItem('token') === null) {
  //   return (
  //     <Navigate to="/login" />
  //   )
  // }

  return (
    <div>
      <NavBar />
      {/* <Outlet /> */}
    </div>
  )
}

export default Dashboard