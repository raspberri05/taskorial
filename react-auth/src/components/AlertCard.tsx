import { FC } from "react";
import { Alert } from "react-bootstrap";

/**
 * Component for displaying an alert card
 * @param props - The properties passed into component: 
 *  - variant: variant of the alert ie 'success', danger', 'info', 'warning' etc.
 *  - message: message to display in alert card
 *  - header: text for header to display in alert card
 * @returns JSX.Element representing the alert card component
 */

export const AlertCard: FC<{
  variant: string;
  message: string;
  header: string;
  callback: () => void;
}> = (props) => {

  /**
   * Function to hide alert card
   * Calls callback function given in props (object containing all properties) to handle alert dismissal
   */
  const hideAlert = () => {
    props.callback();
  };

  return (
    /**
     * Alert component from react-bootstrap
     * @param variant - variant of the alert
     * @param onClose - Callback function triggered when alert is dismissed
     * @param dismissable - indicates whether alert can be dismissed by the user
     */
    <Alert variant={props.variant} onClose={() => hideAlert()} dismissible>
      {props.header}
      <hr />
      {props.message}
    </Alert>
  );
};
