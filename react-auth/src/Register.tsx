import React, { FC, useState } from "react";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { AlertCard } from "./AlertCard";
import { Head } from "./Head";

const cookies = new Cookies();

export const Register: FC<{ type: string }> = (props) => {
  const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
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
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
        displayName,
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

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="displayName"
                name="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter display name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
          </Form>
          {error.show && (
            <AlertCard
              variant="danger"
              message={error.message}
              callback={handleCallback}
              header={error.header}
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
          <h2 className="text-center">Welcome back! Please log in below</h2>
          &nbsp;
          <Head
            title="Login"
            slug="login"
            desc="Log in to an existing account"
          />
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
              <div className="d-flex">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <Button variant="secondary" onClick={toggleShowPassword}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Text>
                <a href="/reset">Forgot password?</a>
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Text>
                Don&apos;t have an account?{" "}
                <a href="/register">Create one now</a>
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
