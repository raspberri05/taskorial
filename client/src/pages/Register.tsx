import React, { FC, useRef, useState } from "react";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { AlertCard } from "../components/AlertCard";
import { Head } from "../components/Head";
import { Link } from "react-router-dom";

const cookies = new Cookies();

export const Register: FC<{ type: string }> = (props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const displayNameRef = useRef<HTMLInputElement>(null);

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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if(!emailRef.current?.value) return emailRef.current?.focus();

    if(!passwordRef.current?.value) return passwordRef.current?.focus()

    setIsLoading(true);
    const configuration = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}login`,
      data: {
        email: emailRef.current?.value,
        password: passwordRef.current?.value
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

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if(!emailRef.current?.value) return emailRef.current?.focus();
  
    if(!displayNameRef.current?.value) return displayNameRef.current?.focus();

    if(!passwordRef.current?.value) return passwordRef.current?.focus()
    
    setIsLoading(true);
    const configuration = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}register`,
      data: {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        displayName: displayNameRef.current?.value
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
          <h2 className="text-center">
            Please fill out the below fields to create an account
          </h2>
          &nbsp;
          <Head
            title="Register"
            slug="register"
            desc="Register for a new account"
          />
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                ref={emailRef}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="displayName"
                name="displayName"
                ref={displayNameRef}
                placeholder="Enter display name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  ref={passwordRef}
                  placeholder="Password"
                />
                <Button variant="secondary" onClick={toggleShowPassword}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Text>
                By creating an account, you are agreeing to our{" "}
                <a href="/terms" target="_blank" rel="noreferrer">
                  Terms and Conditions
                </a>{" "}
                and certifying that you are at least 13 years of age
              </Form.Text>
            </Form.Group>
            {error.show && (
              <AlertCard
                variant="danger"
                message={error.message}
                callback={handleCallback}
                header={error.header}
              />
            )}
            <Button
              type="submit"
              variant="primary"
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
          </Form>
        </>
      )}

      {props.type === "login" && (
        <>
          <h2 className="text-center">Welcome back! Please log in below</h2>
          &nbsp;
          <Head
            title="Login"
            slug="login"
            desc="Log in to an existing account"
          />
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                ref={emailRef}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  ref={passwordRef}
                  placeholder="Password"
                />
                <Button variant="secondary" onClick={toggleShowPassword}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Text>
                <Link to="/reset">Forgot password?</Link>
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Text>
                Don&apos;t have an account?{" "}
                <Link to="/register">Create one now</Link>
              </Form.Text>
            </Form.Group>
            {error2.show && (
              <AlertCard
                variant="danger"
                message={error2.message}
                callback={handleCallback2}
                header={error2.header}
              />
            )}
            <Button
              type="submit"
              variant="primary"
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
          </Form>
        </>
      )}
    </Container>
  );
};
