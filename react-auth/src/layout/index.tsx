import React from 'react'
import { NavBar } from './partials/NavBar'
import Footer from './partials/Footer'
import { Outlet } from 'react-router-dom'

/**
 * Functional component representing layout of app
 * @returns JSX element containing layout structure
 */
export default function Layout() {
  return (
    <React.Fragment>
      <NavBar/>
        <Outlet/>
      <Footer />
    </React.Fragment>
  )
}
