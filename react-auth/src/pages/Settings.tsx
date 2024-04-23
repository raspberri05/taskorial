import { Button, Container } from "react-bootstrap";
import "../main.css";
import { Head } from "../components/Head";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/theme-context";

export const Settings = () => {

  const { theme, setTheme } = useContext(ThemeContext);
  const [themeType, setThemeType] = useState("");

  useEffect(() => {
    theme == "dark" ? setThemeType("Light") : setThemeType("Dark");
  }, [theme]);

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
      <Button
        variant="secondary"
        className="button_link"
        onClick={() => {
          theme === "dark" ? setTheme("light") : setTheme("dark");
        }}
      >
        {themeType} Mode
      </Button>
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
