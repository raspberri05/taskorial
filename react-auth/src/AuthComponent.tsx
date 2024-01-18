import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import Home from "./Home";
import {NavBar} from "./NavBar";
import { TaskCard } from "./TaskCard";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

export default function AuthComponent() {
  const [page, setPage] = useState("");

  useEffect(() => {
    const configuration = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios(configuration)
      .then(() => {
        setPage("Home");
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    window.location.href = "/";
  };

  return (
    <>
      <NavBar currPage={page} logoutFC={logout}/>

      <Container>
        <Home />

        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <TaskCard token={token} />
          </Col>
        </Row>

      </Container>
    </>
  );
}
