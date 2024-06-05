import { Container, Row, Col } from "react-bootstrap";

export default function Home() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1>Welcome to Taskorial</h1>
          <p className="lead">An open-source, (almost) AI-powered task app</p>
          <p>
            Taskorial helps you organize your tasks effortlessly, with the power
            of artificial intelligence coming soon. Whether you&apos;re a
            student, professional, or just someone managing daily chores,
            Taskorial is here to make your life easier.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
