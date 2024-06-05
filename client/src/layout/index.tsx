import React from 'react'
import { NavBar } from './partials/NavBar'
import Footer from './partials/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <React.Fragment>
      <NavBar/>
        <Outlet/>
      <Footer />
    </React.Fragment>
  )
}
