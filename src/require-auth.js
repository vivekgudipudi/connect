import { Navigate, useLocation } from "react-router-dom";

export function RequiresAuth({ children }) {
    const  isLoggedIn  = localStorage.getItem("auth")
    const location = useLocation();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace /> 
  );
}