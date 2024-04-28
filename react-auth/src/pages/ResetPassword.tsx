import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { Head } from "../components/Head";
import { STATUS_CODES } from "http";

/*
 * Component for password reset:
 *  - manages email, password and code states 
 *  - handles sending and analysing code to reset password
 */
export const ResetPassword = () => {
  // Declare variables for email, code, password, sentEmail, emailSent and resetSuccess
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [sentEmail, setSentEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  /** 
   * Function to send code to reset password
   * Sends a code to the provided email address to initiare the password reset process
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} -e The click event object
   */ 
  const sendCode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // Configuration for sending code request
    const configuration = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}reset`,
      data: {
        email,
      },
    };

    // Send request to server to send code
    axios(configuration)
      .then((result) => {
        // Update state (of app's UI) with sent email and set emailSent to true
        setSentEmail(result.data.email);
        setEmailSent(true);
      })
      .catch(() => {
        return;
      });
  };

  /**
   * Function to check code and reset password
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e - The click event object
   */
  const checkCode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // Configuration for checking code request
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}check`,
      data: {
        password,
        code,
        sentEmail,
      },
    };

    // Send request to server to check code and reset password
    axios(config)
      .then(() => {
        // If successful password reset, resetSuccess set to true
        setResetSuccess(true);
      })
      .catch(() => {
        return;
      });
  };

  return (
    <Container>
      <Head title="Reset Password" slug="reset" desc="Reset your password" />
      <Form>
        {!emailSent && !resetSuccess && (
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

        {emailSent && (
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

        {resetSuccess && (
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
  );
};
