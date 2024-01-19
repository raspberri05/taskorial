import { FC } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const ProtectedRoutes: FC<any> = ({ children }) => {
  const token = cookies.get("TOKEN");
  if (token) return children;
  else return <Navigate to="/" />;
};
