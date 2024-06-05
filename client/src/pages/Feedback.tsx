import { Container } from "react-bootstrap";
import { FeedbackForm } from "../components/FeedbackForm";
import { Head } from "../components/Head";

export const Feedback = () => {
  return (
    <Container>
      <Head
        title="Feedback"
        slug="feedback"
        desc="Give us feedback about Taskorial"
      />
      <FeedbackForm />
    </Container>
  );
};
