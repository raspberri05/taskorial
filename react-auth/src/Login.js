import React, { useState } from "react"
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
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

    // make a popup alert showing the "submitted" text
    alert("Submited");
  }

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
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
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>

        {/* display success message */}
        {login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Logged in</p>
        )}

      </Form>
    </>
  )
}