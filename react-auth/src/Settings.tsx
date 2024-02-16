import { Button, Container } from "react-bootstrap";
import "./main.css";

export const Settings = () => {
  return (
    <Container className="text-center">
      <Button>
        <a className="button_link" href="/reset">
          Change Password
        </a>
      </Button>
      <br />
      <br />
      <Button disabled>
        <a className="button_link" href="/reset">
          Change email
        </a>
      </Button>
      <br />
      <br />
      <Button disabled>
        <a className="button_link" href="/reset">
          Delete account
        </a>
      </Button>
      <br />
      <br />
      <Button disabled>
        <a className="button_link" href="/reset">
          Request your data
        </a>
      </Button>
      <div className="text-center" />
    </Container>
  );
};
