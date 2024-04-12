import { Container } from "react-bootstrap";
import { Head } from "./Head";

export const Feedback = () => {
  return (
    <Container>
      <Head
        title="Feedback"
        slug="/feedback"
        desc="Give us feedback about Taskorial"
      />
      <h2 className="text-center">
        We are working on creating a feedback form
      </h2>
      <h3 className="text-center">
        For now, you can send us any feedback at{" "}
        <a href="mailto:support@taskorial.com">support@taskorial.com</a>
      </h3>
    </Container>
  );
};
