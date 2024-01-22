import { FC, useState } from "react";
import { Alert } from "react-bootstrap";

export const AlertCard: FC<{
  variant: string;
  message: string;
  callback: any;
}> = (props) => {
  const hideAlert = () => {
    props.callback();
  };

  return (
    <>
      <Alert variant={props.variant} onClose={() => hideAlert()} dismissible>
        {props.message}
      </Alert>
    </>
  );
};
