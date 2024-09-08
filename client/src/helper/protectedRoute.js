import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token && token.length > 10) {
    return children; // Render the children prop
  } else {
    return <Navigate to="/login" />; // Redirect to the login page
  }
};

// export default ProtectedRoute;
