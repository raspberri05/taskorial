import { FC } from "react";
import { Alert } from "react-bootstrap";

export const AlertCard: FC<{
  variant: string;
  message: string;
  header: string;
  callback: any;
}> = (props) => {
  const hideAlert = () => {
    props.callback();
  };

  return (
      <Alert variant={props.variant} onClose={() => hideAlert()} dismissible>
        {props.header}
        <hr />
        {props.message}
      </Alert>
  );
};
