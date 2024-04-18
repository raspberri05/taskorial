import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Cookies from "universal-cookie";
import axios from "axios";
import { Head } from "../components/Head";

/**
 * Function to add two numbers
 * @returns rendered react html
 */
export const Delete: FC<{ token: string }> = (props) => {
  const token = props.token;
  const [message, setMessage] = useState<string>("");

  /**
   * Function to delete Account
   * @returns does not return anythin
   */
  const deleteAccount = () => {
    if (!token) {
      setMessage("Token not found. Please login again.");
      return;
    }

    const configuration = {
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}delete`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(configuration)
      .then(() => {
        setMessage("Logging Out");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000); // Redirect to login page after 3 seconds
        const cookies = new Cookies();
        cookies.remove("TOKEN", { path: "/" });
      })
      .catch((error) => {
        setMessage("Error deleting account");
        console.log(error);
      });
  };

  return (
    <Container>
      <Head
        title="Delete Account"
        slug="delete"
        desc="Delete your Taskorial account here"
      />
      <p>
        Are you sure you want to delete your account? This will delete all
        account data forever!
      </p>
      <Button variant="danger" onClick={() => deleteAccount()}>
        Delete Account
      </Button>
      <p>{message}</p>
    </Container>
  );
};
