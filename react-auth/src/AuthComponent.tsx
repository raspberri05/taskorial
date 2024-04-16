import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { TaskCard } from "./TaskCard";
import { Head } from "./Head";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

export default function AuthComponent() {
  const [name, setName] = useState<string>("Placeholder name");

  /**
   * Function decode a jwt token
   * @param t the token
   * @returns the decoded json of the token
   */
  function decodeToken(t: string) {
    return JSON.parse(atob(t.split(".")[1]));
  }

  useEffect(() => {
    setName(decodeToken(token).displayName);
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Head title="Home" slug="home" desc="Below you will see your tasks" />
      <h2>Welcome back, {name}!</h2>
      &nbsp;
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <TaskCard token={token} />
        </Col>
      </Row>
    </Container>
  );
}
