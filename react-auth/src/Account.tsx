import React from "react";
import Register from "./Register";
import { NavBar } from "./NavBar";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
import './main.css'

export default function Account() {
  return (
    <>
      <Container>
        <Register/>
      </Container>
    </>
  );
}
