import { Button, Container } from "react-bootstrap";
import "../main.css";
import { Head } from "../components/Head";
import { ThemeToggle } from '../ThemeToggle'; // Updated import statement

export const Settings = () => {
  return (
    <Container className="text-center">
      <Head
        title="Settings"
        slug="settings"
        desc="Settings for your Taskorial account"
      />
      <h2 className="text-center">Account settings</h2>
      <br />
      <br />
      <Button className="button_link" href="/reset">
        Change Password
      </Button>
      <br />
      <br />
      <Button disabled className="button_link" href="/reset">
        Change email
      </Button>
      <br />
      <br />
      <Button variant="danger" className="button_link" href="/delete">
        Delete account
      </Button>
      <br />
      <br />
      <Button disabled className="button_link" href="/reset">
        Request your data
      </Button>
      <br />
      <br />
      <ThemeToggle />
      <div className="text-center" />
    </Container>
  );
};