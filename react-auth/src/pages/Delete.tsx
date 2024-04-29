import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Cookies from "universal-cookie";
import axios from "axios";
import { Head } from "../components/Head";

/**
 * Function to add two numbers
 * @param token - authentication token
 * @returns rendered react html
 */
export const Delete: FC<{ token: string }> = (props) => {
  const token = props.token;
  const [message, setMessage] = useState<string>("");

  /**
   * Function to delete Account
   * @returns no return value
   */
  const deleteAccount = () => {
    // Check if token exists
    if (!token) {
      // Display error message if token is missing
      setMessage("Token not found. Please login again.");
      return;
    }

    // Configuration for the axios request
    const configuration = {
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}delete`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Send request to delete user account
    axios(configuration)
      .then(() => {
        // Display success message 
        setMessage("Logging Out");
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          window.location.href = "/";
        }, 1000); 
        // Remove token cookie
        const cookies = new Cookies();
        cookies.remove("TOKEN", { path: "/" });
      })
      .catch((error) => {
        // Display error message if deletion fails
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
