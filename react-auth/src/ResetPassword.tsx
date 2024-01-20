import { FC, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export const ResetPassword: FC<{}> = (props) => {
  const [email, setEmail] = useState("");

  const sendCode = (e: any) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: process.env.REACT_APP_API_URL + "reset",
      data: {
        email
      },
    };

    axios(configuration)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        <Button variant="primary" onClick={(e) => sendCode(e)}>
          Send code
        </Button>
      </Form>
    </>
  );
};
