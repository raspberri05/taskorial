import React, { useEffect, useState } from "react";
import { Button, Navbar, Container, Nav, Offcanvas, Form } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import "./index.css"
import Home from "./Home";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

export default function AuthComponent() {
  const [message, setMessage] = useState("");
  const [page, setPage] = useState("Home");
  const [task, setTask] = useState("");

  useEffect(() => {
    const configuration = {
      method: "get",
      url: "http://localhost:8080/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(configuration)
      .then((result) => {
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  }

  const makeTask = (e) => {
    e.preventDefault();
    
    let obj = JSON.parse(atob(token.split(".")[1]))
    let name = task
    let completed = false
    let userId = obj.userId

    const configuration = {
      method: "post",
      url: "http://localhost:8080/tasks",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        completed,
        userId,
      },
      }

      axios(configuration)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        })
    }


  return (
    <>
      <Navbar key={false} expand={false} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Brand>{page}</Navbar.Brand>
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
                <Nav.Link href="#">Home</Nav.Link>
                <Nav.Link href="/" onClick={() => logout()}>Log Out</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* displaying our message from our API call */}
      {/* <h3 className="text-center">{message}</h3> */}

      <Container>
        <Home />

          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Task List</Form.Label>
              <Form.Control onChange={(e) => setTask(e.target.value)}placeholder="Enter task name" />
            </Form.Group>
          <Button onClick={(e) => makeTask(e)}  variant="primary" type="submit">
              Add task
            </Button>
          </Form>
  
      </Container>
    </>
  );
}
