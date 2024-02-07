import { Button, Container } from "react-bootstrap";
import { NavBar } from "./NavBar";
import "./main.css";

export const Settings = () => {
  return (
      <Container className="text-center">
        <Button>
          <a className="button_link" href="/reset">
            Reset Password
          </a>
        </Button>
        <div className="text-center" />
      </Container>
  );
};
