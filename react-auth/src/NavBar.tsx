import React, { FC } from "react";
import { Nav, Navbar, Container, NavbarToggle } from "react-bootstrap";
import Cookies from "universal-cookie";
import "./main.css";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

export const NavBar: FC<{}> = (props) => {
  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    window.location.href = "/";
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
          <Navbar.Brand href="/">
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
              {token !== undefined && <Nav.Link href="/home">Home</Nav.Link>}
            </Nav>
            <Nav>
              {token !== undefined && (
                <Nav.Link href="/settings">Settings</Nav.Link>
              )}
              {token !== undefined && (
                <Nav.Link onClick={() => logout()}>Sign Out</Nav.Link>
              )}
              {token === undefined && <Nav.Link href="/login">Log In</Nav.Link>}
              {token === undefined && (
                <Nav.Link href="/register">Sign Up</Nav.Link>
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
