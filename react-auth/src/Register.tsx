import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { AlertCard } from "./AlertCard";

const cookies = new Cookies();

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: "",
    header: "",
  });
  const [error2, setError2] = useState({
    show: false,
    message: "",
    header: "",
  });

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: process.env.REACT_APP_API_URL + "login",
      data: {
        email,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        window.location.href = "/auth";
        setLogin(true);
      })
      .catch((error) => {
        setError2({
          show: true,
          message: error.message,
          header: error.response.data.message,
        });
      });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const configuration = {
      method: "post",
      url: process.env.REACT_APP_API_URL + "register",
      data: {
        email,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        setRegister(true);
        handleLogin(e);
      })
      .catch((error) => {
        setError({
          show: true,
          message: error.message,
          header: error.response.data.message,
        });
      });
  };

  const handleClose = () => {
    setShow(!show);
  };

  const handleClose2 = () => {
    setShow2(!show2);
  };

  const handleCallback = () => {
    setError({ show: false, message: "", header: "" });
  };

  const handleCallback2 = () => {
    setError2({ show: false, message: "", header: "" });
  };

  return (
    <>
      <div className="text-center">
        <Button className="text-center" variant="primary" onClick={handleClose}>
          Create an account
        </Button>
        <br />
        <br />
        <Button variant="primary" onClick={handleClose2}>
          Sign in
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create a new account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Text>
                By creating an account, you are agreeing to our{" "}
                <a href="/terms" target="_blank">
                  Terms and Conditions
                </a>{" "}
                and certifying that you are at least 13 years of age
              </Form.Text>
            </Form.Group>
          </Form>

          {error.show && (
            <AlertCard
              variant="danger"
              message={error.message}
              callback={handleCallback}
              header={error.header}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign in to your account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Text>
                <a href="/reset">Forgot password?</a>
              </Form.Text>
            </Form.Group>
          </Form>

          {error2.show && (
            <AlertCard
              variant="danger"
              message={error2.message}
              callback={handleCallback2}
              header={error2.header}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => handleLogin(e)}>
            Log in
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
