import { FC, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { NavBar } from "./NavBar";

export const ResetPassword: FC<{}> = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [sentEmail, setSentEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

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
        setSentEmail(result.data.email);
        setEmailSent(true);
      })
      .catch((error) => {});
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
        setResetSuccess(true);
      })
      .catch((error) => {});
  };

  return (
    <>
      <NavBar currPage="Reset Password" />
      <Container>
        <Form>
          {emailSent === false && resetSuccess === false && (
            <>
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
            </>
          )}

          {emailSent === true && (
            <>
              <Form.Group className="mb-3" controlId="formBasicCode">
                <Form.Label>Code</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste the code sent to your email address here"
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
            </>
          )}

          {resetSuccess === true && (
            <>
              <br />
              <Alert variant="success">
                Password reset successful. Please click <a href="/">here</a> to
                login.
              </Alert>
            </>
          )}
        </Form>
      </Container>
    </>
  );
};
