import { FC } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

/**
 * A higher-order component (HOC) that wraps around a child component.
 * It takes a 'children' prop representing the protected content to be rendered.
 */
export const ProtectedRoutes: FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = cookies.get("TOKEN");
  if (token) return (children as React.ReactElement);
  else return <Navigate to="/login" />;
};
