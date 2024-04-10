import { Container, Row, Col } from "react-bootstrap";
import Cookies from "universal-cookie";
import { NavBar } from "./NavBar";
import { TaskCard } from "./TaskCard";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

export default function AuthComponent() {
  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <TaskCard token={token} />
        </Col>
      </Row>
    </Container>
  );
}
