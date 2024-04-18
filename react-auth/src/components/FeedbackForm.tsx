import { FC, FormEvent, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";

export const FeedbackForm: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO Add code to submit feedback
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          data-testid="name-input"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          data-testid="email-input"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFeedback">
        <Form.Label>Feedback</Form.Label>
        <Form.Control
          type="text"
          name="feedback"
          value={feedback}
          as="textarea"
          rows={3}
          required
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Feedback"
          data-testid="feedback-input"
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={isSubmitting}
        data-testid="form-submit-btn"
        aria-label="Submit Feedback"
      >
        {isSubmitting ? (
          <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden">Submitting Feedback...</span>
          </Spinner>
        ) : (
          <>Submit Feedback</>
        )}
      </Button>
    </Form>
  );
};
