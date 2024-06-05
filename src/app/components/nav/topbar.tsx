"use client";

import { Nav, Navbar, Container } from "react-bootstrap";
import { SignInButton, SignedOut, SignedIn, UserButton } from "@clerk/nextjs";

export default function TopBar() {
  return (
    <>
      <Navbar fixed="top" collapseOnSelect expand="lg" className="nav">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="/images/originals/ORIGINAL_LOGO_IMG.png"
              height="30px"
              alt="taskorial logo"
            />
            <span className="fs-5 text-light">&nbsp;&nbsp;Taskorial</span>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/dashboard" className="text-light">
              Dashboard
            </Nav.Link>
          </Nav>
          <Nav>
            <SignedOut>
              <SignInButton>
                <Nav.Link className="text-light">Log In/Sign Up</Nav.Link>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Nav.Link>
                <UserButton />
              </Nav.Link>
            </SignedIn>
          </Nav>
        </Container>
      </Navbar>

      <br />
      <br />
      <br />
      <br />
    </>
  );
}
