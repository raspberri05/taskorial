import { Container, Button } from "react-bootstrap";
import { Head } from "./Head";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

export const LandingPage = () => {
  const redir = (loc: string) => {
    window.location.href = `/${loc}`;
    if (loc == "") {
      cookies.remove("TOKEN", { path: "/" });
    }
  };

  const logout = () => {};

  return (
    <Container>
      <Head
        title="Taskorial"
        slug=""
        desc="Welcome to Taskorial, an open source AI-powered task app"
      />
      <h1 className="text-center">Welcome to Taskorial</h1>
      <h2 className="text-center">An open source, AI powered task app</h2>
      &nbsp;
      <Container>
        <div className="d-grid gap-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => redir(token ? "home" : "login")}
          >
            {token ? "Go To Dashboard" : "Log In"}
          </Button>
          <br />
          <Button
            variant="primary"
            size="lg"
            onClick={() => redir(token ? "" : "register")}
          >
            {token ? "Log Out" : "Create An Account"}
          </Button>
        </div>
      </Container>
    </Container>
  );
};
