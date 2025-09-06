import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Error404Page from "../Pages/Error404Page";
import ProtectedRouter from "./ProtectedRouter"; 
import LoginPage from "../Pages/LoginPage"; 
import UserProfile from "../Pages/UserProfile"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // --- Public Routes -------------------------------------------------------------------------------------------------------------------
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },

      // --- Protected Routes (User must be logged in) ---
      {
        element: <ProtectedRouter ProtectedRole="user" />, 
        children: [
          {
            path: "profile", 
            element: <UserProfile />,
          },
          // {
          //   path: "checkout",
          //   element: <Checkout />,
          // },
        ],
      },

      // --- Catch-all for 404 Not Found --------------------------------------------------------------------------------------------------------------------------------
      {
        path: "*",
        element: <Error404Page />,
      },
    ],
  },
  // --- Routes without the MainLayout --------------------------------------------------------------------------------------------------------------------------------
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;