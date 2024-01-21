import { FC, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

export const ResetPassword: FC<{}> = (props) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [sentEmail, setSentEmail] = useState("");

  const sendCode = (e: any) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: process.env.REACT_APP_API_URL + "reset",
      data: {
        email,
      },
    };

    axios(configuration)
      .then((result) => {
        console.log(result);
        setSentEmail(result.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkCode = (e: any) => {
    e.preventDefault();
    const config = {
      method: "post",
      url: process.env.REACT_APP_API_URL + "check",
      data: {
        password,
        code,
        sentEmail,
      },
    };

    axios(config)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container>
        <br />
        <h1 className="text-center">Reset password</h1>
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

          <Button variant="primary" onClick={(e) => sendCode(e)}>
            Send code
          </Button>

          <br />
          <br />

          <Form.Group className="mb-3" controlId="formBasicCode">
            <Form.Label>Code</Form.Label>
            <Form.Control
              type="text"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </Form.Group>

          <Button variant="primary" onClick={(e) => checkCode(e)}>
            Reset Password
          </Button>

          <br />
          <br />
        </Form>
      </Container>
    </>
  );
};
