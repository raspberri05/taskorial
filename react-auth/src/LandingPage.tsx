import { Container, Button, Row, Col } from "react-bootstrap";
import { Head } from "./Head";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

export const LandingPage = () => {
  /**
   * Function to redirect to specified page
   * @param loc The location to be redirected to
   * @returns No return value
   */
  const redir = (loc: string) => {
    window.location.href = `/${loc}`;
    if (loc === "") {
      cookies.remove("TOKEN", { path: "/" });
    }
  };

  return (
    <Container>
      <Head
        title="Taskorial"
        slug=""
        desc="Welcome to Taskorial, an open-source AI-powered task app"
      />
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1>Welcome to Taskorial</h1>
          <p className="lead">An open-source, AI-powered task app</p>
          <p>
            Taskorial helps you organize your tasks effortlessly with the power
            of artificial intelligence. Whether you're a student, professional,
            or just someone managing daily chores, Taskorial is here to make
            your life easier.
          </p>
          <div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => redir(token ? "home" : "login")}
              className="me-3"
            >
              {token ? "Go To Dashboard" : "Log In"}
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => redir(token ? "" : "register")}
            >
              {token ? "Log Out" : "Create An Account"}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
