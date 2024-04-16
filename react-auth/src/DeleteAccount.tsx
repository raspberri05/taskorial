import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Cookies from "universal-cookie";
import axios from 'axios';

export const DeleteAccount: FC<{ token: string }> = (props) => {
  const token = props.token;
  const [message, setMessage] = useState<string>('');

  const deleteAccount = async () => {
    if (!token) {
      setMessage('Token not found. Please login again.');
      return;
    }

    const configuration = {
    method: "delete",
    url: `${process.env.REACT_APP_API_URL}delete-account`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    };

    axios(configuration)
    .then((response) => {
      setMessage(response.data.message + " - Logging out...");
      setTimeout(() => { window.location.href = "/login" }, 3000); // Redirect to login page after 3 seconds
      const cookies = new Cookies();
      cookies.remove("TOKEN", { path: "/" });
    })
    .catch((error) => {
      setMessage('Error deleting account');
      console.log(error);
    });
  };

  return (
    <Container>
      <p>Please confirm to delete your account (all of your tasks will also be deleted)</p>  
      <Button variant="primary" onClick={deleteAccount}>Delete Account</Button>
      <p>{message}</p>
    </Container>
  );
};