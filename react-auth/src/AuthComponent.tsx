import { Container, Row, Col } from "react-bootstrap";
import Cookies from "universal-cookie";
import { TaskCard } from "./TaskCard";
import { Head } from "./Head";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

export default function AuthComponent() {
  return (
    <Container>
      <Head title="Home" slug="/home" desc="Below you will see your tasks"/>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <TaskCard token={token} />
        </Col>
      </Row>
    </Container>
  );
}
