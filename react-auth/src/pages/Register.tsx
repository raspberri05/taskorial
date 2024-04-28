import React, { FC, useRef, useState } from "react";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { AlertCard } from "../components/AlertCard";
import { Head } from "../components/Head";
import { Link } from "react-router-dom";

// Create instance of cookies
const cookies = new Cookies();

/**
 * Register component for user registration
 * @param props - object containing register component's properties: type of form (login/register)
 */
export const Register: FC<{ type: string }> = (props) => {
  // Reference variables for form inputs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const displayNameRef = useRef<HTMLInputElement>(null);

  // Declaring error state and loading state variables
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

  /**
   * Toggles visibility of password input
  */
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /**
   * Handles login form submission
   * @param e - Form event object
   */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Checking if email then password have been provided
    if(!emailRef.current?.value) return emailRef.current?.focus();
    if(!passwordRef.current?.value) return passwordRef.current?.focus()

    // Set loading status to true while request is being made
    setIsLoading(true);
    // Configuaration for axios request
    const configuration = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}login`,
      data: {
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      },
    };

    // Make axios request
    axios(configuration)
      .then((result) => {
        // Set token in cookies and redirect to home page on successful login
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        window.location.href = "/home";
      })
      .catch((error) => {
        // Display error message if login fails
        setError2({
          show: true,
          message: error.message,
          header: error.response.data.message,
        });
      })
      .finally(() => {
        // Set loading state to false after request completes
        setIsLoading(false);
      });
  };

  /**
   * Handles form submission for user registration
   * @param e - form event object
   */
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    // Check ig email, display name and password have been provided repectively
    if(!emailRef.current?.value) return emailRef.current?.focus();
    if(!displayNameRef.current?.value) return displayNameRef.current?.focus();
    if(!passwordRef.current?.value) return passwordRef.current?.focus()
    
    // Set loading state to true while request is being made
    setIsLoading(true);

    // Configuration for axios request
    const configuration = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}register`,
      data: {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        displayName: displayNameRef.current?.value
      },
    };

    // Make axios request
    axios(configuration)
      .then(() => {
        // If registration succeeds, process with login
        handleLogin(e);
      })
      .catch((error) => {
        // If registration fails, display error message
        setError({
          show: true,
          message: error.message,
          header: error.response.data.message,
        });
      })
      .finally(() => {
        // Set loading state to false after request completes
        setIsLoading(false);
      });
  };

  /**
   * Callback function to handle closing the first error alert
   */
  const handleCallback = () => {
    setError({ show: false, message: "", header: "" });
  };

  /** 
   * Callback function to handle closing the second error alert
   */
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

            {/*Display name input*/}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="displayName"
                name="displayName"
                ref={displayNameRef}
                placeholder="Enter display name"
              />
            </Form.Group>

            {/*Password input*/}
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

            {/*Agreement text*/}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Text>
                By creating an account, you are agreeing to our{" "}
                <a href="/terms" target="_blank" rel="noreferrer">
                  Terms and Conditions
                </a>{" "}
                and certifying that you are at least 13 years of age
              </Form.Text>
            </Form.Group>

            {/*Error alert*/}
            {error.show && (
              <AlertCard
                variant="danger"
                message={error.message}
                callback={handleCallback}
                header={error.header}
              />
            )}

            {/*Submit button*/}
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

      {/*Login form*/}
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
            {/*Email input*/}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                ref={emailRef}
                placeholder="Enter email"
              />
            </Form.Group>

            {/*Password input*/}
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

            {/*Forgot Password link*/}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Text>
                <Link to="/reset">Forgot password?</Link>
              </Form.Text>
            </Form.Group>

            {/*Register link*/}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Text>
                Don&apos;t have an account?{" "}
                <Link to="/register">Create one now</Link>
              </Form.Text>
            </Form.Group>

            {/*Error alert*/}
            {error2.show && (
              <AlertCard
                variant="danger"
                message={error2.message}
                callback={handleCallback2}
                header={error2.header}
              />
            )}
            {/*Submit button*/}
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
