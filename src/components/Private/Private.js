import { Navigate } from "react-router-dom";
import { auth } from "../commom/localStorage";

export default function Private({ children }) {
  if (!auth) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
