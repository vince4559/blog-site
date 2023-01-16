
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const SharedComponent = () => {
  return (
   <>
    <Navbar />
    <Outlet />
   </>
  )
}

export default SharedComponent
