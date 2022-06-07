import React from 'react'
import { Navigate } from 'react-router-dom';

const LandingPage = () => {

  if(localStorage.getItem('token')) {
    return <Navigate to="/home" />
  }

  return (
    <div>LandingPage</div>
  )
}

export default LandingPage