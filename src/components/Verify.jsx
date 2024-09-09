import { Navigate, useLocation } from "react-router-dom";

function Verify({ children }) {
  const location = useLocation();
  const fromPage = location.state?.from;

  if (fromPage !== "login" && fromPage !== "signup") {
    // Redirect to login page if not coming from login or signup
    return <Navigate to="/login" replace />;
  }

  // If coming from login or signup, render the children (OTP page)
  return children;
}

export default Verify;
