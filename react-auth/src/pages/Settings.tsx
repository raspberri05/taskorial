import { Button, Container } from "react-bootstrap";
import "../main.css";
import { Head } from "../components/Head";

/**
 * Function to display the Settings page
 * This component displays various account settings options such as changing password, changing email (disabled), deleting account and requesting data
 * @returns JSX element containing rendered Settings page
 */
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
      <div className="text-center" />
    </Container>
  );
};
