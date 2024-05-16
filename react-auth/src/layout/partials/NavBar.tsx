import React, { FC, useState, useEffect } from "react";
import { Nav, Navbar, Container, NavbarToggle } from "react-bootstrap";
import Cookies from "universal-cookie";
import "../../main.css";
import { Link, useNavigate } from "react-router-dom";

// Create a new instance of cookies and retireve tokens from them
const cookies = new Cookies();

/**
 * Functionaly component representing navigation bar of app
 * @returns JSX element containing navigation bar content
 */
export const NavBar: FC<object> = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | undefined>(cookies.get("TOKEN"));
  /**
   * Function to logout users
   */
  useEffect(() => {
    setToken(cookies.get("TOKEN"));
  }, []);
  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    // window.location.href = "/";
    setToken(undefined);
    navigate("/");
  };

  return (
    <>
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="../assets/originals/ORIGINAL_LOGO_IMG.png"
              height="30px"
              alt="taskorial logo"
            />
            <span className="fs-5">&nbsp;&nbsp;Taskorial</span>
          </Navbar.Brand>
          <NavbarToggle aria-controls="responsive-navbar-nav">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </NavbarToggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {token !== undefined && (
                <Nav.Link as={Link} to="/home">
                  Home
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              {token !== undefined && (
                <Nav.Link as={Link} to="/settings">
                  Settings
                </Nav.Link>
              )}
              {token !== undefined && (
                <Nav.Link onClick={() => logout()}>Sign Out</Nav.Link>
              )}
              {token === undefined && (
                <Nav.Link as={Link} to="/login">
                  Log In
                </Nav.Link>
              )}
              {token === undefined && (
                <Nav.Link as={Link} to="/register">
                  Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <br />
      <br />
      <br />
      <br />
    </>
  );
};
