import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/HomePage";
import About from "../Pages/AboutPage";
import Error404Page from "../Pages/Error404Page";
import LoginPage from "../Pages/LoginPage";
import UserProfile from "../Pages/UserProfile";
import ProtectedRouter from "./ProtectedRouter";
import RegisterPage from "../Pages/RegisterPage";
import CartPage from "../Pages/CartPage";
import ContactPage from "../Pages/ContactPage";
import CheckoutPage from "../Pages/CheckoutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // --- Public Routes -------------------------------------------------------------------------------------------------------------------------------------
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },

      // --- Protected Routes (User must be logged in) --------------------------------------------------------------------------------------------------------------
      {
        element: <ProtectedRouter ProtectedRole="CUSTOMER" />,
        children: [
          {
            path: "profile",
            element: <UserProfile />,
          },
          {
            path: "checkout",
            element: <CheckoutPage />,
          },
          {
            path: "notifications",
            element: <CheckoutPage />,
          },
        ],
      },
      // --- Admin Protected Routes  (User must be logged in and Role Must be ADMIN) --------------------------------------------------------------------------------
      {
        element: <ProtectedRouter ProtectedRole="ADMIN" />,
        children: [
          {
            path: "admin",
            element: <UserProfile />,
          },
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
  // {
  //    path: "/login",
  //    element: <LoginPage />,
  // },
  // {
  //    path: "/register",
  //    element: <RegisterPage />,
  // },
]);

const AppRouter = () => {
   return <RouterProvider router={router} />;
};

export default AppRouter;
