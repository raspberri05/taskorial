import React, {FC} from 'react';

import {
  Nav,
  Navbar,
  Offcanvas,
  Container
} from 'react-bootstrap'

export const NavBar: FC<{currPage: String, logoutFC: Function}> = (props) => {
  return (
    <Navbar expand={false} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
        <Navbar.Brand>{props.currPage}</Navbar.Brand>
        <Navbar.Brand> </Navbar.Brand>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${false}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
              To Do List
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/" onClick={() => props.logoutFC()}>
                Log Out
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}