import React, { useEffect, useState } from "react";
import {
  Button,
  Navbar,
  Container,
  Nav,
  Offcanvas,
  Form,
  Row,
  Col,
  Card,
  ListGroup,
  Table
} from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import Home from "./Home";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

export default function AuthComponent() {
  const [message, setMessage] = useState("");
  const [page, setPage] = useState("Home");
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

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

    getTasks();
  }, []);

  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    window.location.href = "/";
  };

  const makeTask = (e) => {
    e.preventDefault();

    let obj = JSON.parse(atob(token.split(".")[1]));
    let name = task;
    let completed = false;
    let userId = obj.userId;

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
    };

    setTask("");

    axios(configuration)
      .then((result) => {
        //console.log(result);
        getTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTasks = () => {
    const configuration = {
      method: "get",
      url: "http://localhost:8080/tasks",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(configuration)
      .then((result) => {
        let res = result.data.result;
        setTaskList([...res].reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const completeTasks = (taskName) => {
    console.log(taskName)
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
                {/* <Nav.Link href="#">Home</Nav.Link> */}
                <Nav.Link href="/" onClick={() => logout()}>
                  Log Out
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* displaying our message from our API call */}
      {/* <h3 className="text-center">{message}</h3> */}

      <Container>
        <Home />

        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">My Tasks</Card.Title>

                <br />

                <Form onSubmit={makeTask}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      onChange={(e) => setTask(e.target.value)}
                      value={task}
                      placeholder="Enter task name"
                    />
                  </Form.Group>
                </Form>

                <Table hover>
                  <tbody>
                    {taskList.map((t) => (
                      <tr key={t._id}>
                        <td onClick={() => completeTasks(t.name)}>{t.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            <br />
            <br />
          </Col>

          {/* <Col xs={12} sm={12} md={6} lg={6}>
            <Card>
              <Card.Body>
                <Card.Title>Placeholder Title</Card.Title>
                <Card.Text>Placeholder Content</Card.Text>
              </Card.Body>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </>
  );
}
