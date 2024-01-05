import React, { useState } from "react"
import { Form, Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    //set configuration
    const configuration = {
      method: "post",
      url: "http://localhost:8080/register",
      data: {
        email,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        setRegister(true);
        handleLogin(e)
      })
      .catch((error) => {
        error = new Error();
      });
  }

  const handleLogin = (e) => {
    e.preventDefault();

    const configuration = {
      method: "post",
      url: "http://localhost:8080/login",
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
        error = new Error();
      });
  }

  return (
    <>
    {/* <h2>Register</h2> */}
    <Form>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email" />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" />
        </Form.Group>

        {/* submit button */}
        <ButtonGroup>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => handleSubmit(e)}>
            Sign Up
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => handleLogin(e)}>
            Log In
          </Button>
        </ButtonGroup>
        
    </Form>
    </>
  )
}