import {FC, useState} from 'react';

import {
  Nav,
  Navbar,
  Offcanvas,
  Container,
  Button
} from 'react-bootstrap'

import "./main.css"

export const NavBar: FC<{currPage: String, logoutFC: Function}> = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const noShow = () => {
    setShow(false)
  }

  return (
    <Navbar expand={false} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Button className="hamburger" onClick={handleShow}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
          </svg>
        </Button>
        <Navbar.Brand>{props.currPage}</Navbar.Brand>
        <Navbar.Brand> </Navbar.Brand>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
              Taskorial
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body onClick={() => noShow()}>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/auth">
                Home
              </Nav.Link>
              <Nav.Link href="/" onClick={() => props.logoutFC()}>
                Log Out
              </Nav.Link>
                <hr></hr>
              <Nav.Link target="_blank" href="https://github.com/raspberri05/todo-list">
                View on Github
              </Nav.Link>
              <Nav.Link href="#">
                Website Feedback
              </Nav.Link>
                <hr></hr>
              <Nav.Link target="_blank" href="https://taskorial.netlify.app/assets/legal/privacy_policy.pdf">
                Privacy Policy
              </Nav.Link>
              <Nav.Link target="_blank" href="https://taskorial.netlify.app/assets/legal/terms_and_conditions.pdf">
                Terms and Conditions
              </Nav.Link>
              <Nav.Link target="_blank" href="https://taskorial.netlify.app/assets/legal/eula.pdf">
                EULA
              </Nav.Link>
              <Nav.Link href="#">
                Copyright 2024 Taskorial
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  )
}