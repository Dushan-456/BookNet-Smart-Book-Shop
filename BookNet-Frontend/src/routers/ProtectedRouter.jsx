import { Navigate, Outlet } from "react-router-dom";
import Error403Page from "../Pages/Error403Page";
import { useAuth } from "../Context/AuthContext";

const ProtectedRouter = ({ ProtectedRole }) => {
  // user and authentication status from the global context
  const { isAuthenticated, user } = useAuth();

  // Check if the user is authenticated
  if (!isAuthenticated) {
    // If not, redirect them to the login page
    return <Navigate to="/login" replace />;
  }

  // Check for role-based access if a 'ProtectedRole' is required
  // An 'ADMIN' can access any protected route.
  const isAuthorized = user.role === 'ADMIN' || user.role === ProtectedRole;

  if (ProtectedRole && !isAuthorized) {
    // If a role is required and the user is not an admin or doesn't have the role
    return <Error403Page />;
  }

  //  If the user is authenticated and has the correct role (or no role is required),
  // render the child component 
  return <Outlet />;
};

export default ProtectedRouter;