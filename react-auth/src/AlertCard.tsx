import { FC } from "react";
import { Alert } from "react-bootstrap";

interface AlertCardProps {
  variant: string;
  message: string;
  header: string;
  callback: () => void;
  onHeaderClick?: () => void;
}

export const AlertCard: FC<AlertCardProps> = ({
  variant,
  message,
  header,
  callback,
  onHeaderClick,
}) => {
  const hideAlert = () => {
    callback();
  };

  const handleHeaderClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    onHeaderClick?.();
  };

  return (
    <Alert variant={variant} onClose={hideAlert} dismissible>
      {onHeaderClick ? (
        <a href="#" onClick={handleHeaderClick}>
          {header}
        </a>
      ) : (
        header
      )}
      <hr />
      {message}
    </Alert>
  );
};