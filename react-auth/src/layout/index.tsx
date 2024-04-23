import React, { useContext, useEffect } from "react";
import { NavBar } from './partials/NavBar'
import Footer from './partials/Footer'
import { Outlet } from 'react-router-dom'
import { ThemeContext } from "../contexts/theme-context";

export default function Layout() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme == "light") {
      document.querySelector("html").setAttribute("data-bs-theme", "light");
    } else {
      document.querySelector("html").setAttribute("data-bs-theme", "dark");
    }
  }, [theme]);

  return (
    <React.Fragment>
      <NavBar/>
        <Outlet/>
      <Footer />
    </React.Fragment>
  )
}
