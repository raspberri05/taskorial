import React, { FC, useState } from "react";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { AlertCard } from "./AlertCard";
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();

export const Register: FC<{ type: string; email?: string }> = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(props.email || "");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const handleNavigateToOppositePage = () => {
    setPassword("");
    navigate(props.type === 'register' ? '/login' : '/register');
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsLoading(true);
    const configuration = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}login`,
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
        window.location.href = "/home";
      })
      .catch((error) => {
        setError2({
          show: true,
          message: error.message,
          header: error.response.data.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsLoading(true);

    const configuration = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}register`,
      data: {
        email,
        password,
      },
    };

    axios(configuration)
      .then(() => {
        handleLogin(e);
      })
      .catch((error) => {
        setError({
          show: true,
          message: error.message,
          header: error.response.data.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCallback = () => {
    setError({ show: false, message: "", header: "" });
  };

  const handleCallback2 = () => {
    setError2({ show: false, message: "", header: "" });
  };

  return (
    <Container>
      {props.type === "register" && (
        <>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={props.email || email}
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
              header={
                error.header + " Click here to go to the " + (props.type === "register" ? "login" : "sign-up") + " page."
              }
              onHeaderClick={handleNavigateToOppositePage}
            />
          )}
          <Button
            variant="primary"
            onClick={(e) => handleSubmit(e)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <>Sign Up</>
            )}
          </Button>{" "}
        </>
      )}

      {props.type === "login" && (
        <>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={props.email || email}
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Text>
                Don't have an account? <a href="/register">Create one now</a>
              </Form.Text>
            </Form.Group>
          </Form>

          {error2.show && (
            <AlertCard
              variant="danger"
              message={error2.message}
              callback={handleCallback2}
              header={
                error2.header + " Click here to go to the " + (props.type === "login" ? "sign-up" : "login") + " page."
              }
              onHeaderClick={handleNavigateToOppositePage}
            />
          )}
          <Button
            variant="primary"
            onClick={(e) => handleLogin(e)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <>Login</>
            )}
          </Button>
        </>
      )}
    </Container>
  );
};