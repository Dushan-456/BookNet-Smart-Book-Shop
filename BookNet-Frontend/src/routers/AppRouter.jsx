import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/HomePage";
import About from "../Pages/AboutPage";
import Error404Page from "../Pages/Error404Page";
import LoginPage from "../Pages/LoginPage";
import UserProfile from "../Pages/UserProfile";
import ProtectedRouter from "./ProtectedRouter";
import RegisterPage from "../Pages/RegisterPage";

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
   {
      path: "/register",
      element: <RegisterPage />,
   },
]);

const AppRouter = () => {
   return <RouterProvider router={router} />;
};

export default AppRouter;
