import { Navigate, Outlet } from "react-router-dom";
import Error403Page from "../Pages/Error403Page";

const ProtectedRouter = ({ProtectedRole}) => {
   const user = {
      isAuthenticated: true,
      role: "user", // or "admin"
   };

   if (!user.isAuthenticated) {
      return <Navigate to="/login" replace />;
   }
   if (user.role === 'admin') {
      return <Outlet />;
   }
   if (user.role === ProtectedRole) {
      return <Outlet />;
   }
   return <Error403Page />;
};

export default ProtectedRouter;
