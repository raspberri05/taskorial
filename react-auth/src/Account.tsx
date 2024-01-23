import React from "react";
import Register from "./Register";
import { NavBar } from "./NavBar";
import { Container } from "react-bootstrap";

export default function Account() {
  return (
    <>
      <NavBar currPage="Welcome to Taskorial" />
      <Container>
        <Register />
      </Container>
    </>
  );
}
