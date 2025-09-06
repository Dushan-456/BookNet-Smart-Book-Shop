import {
   BrowserRouter,
   createBrowserRouter,
   Route,
   RouterProvider,
   Routes,
} from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import ProtectedRouter from "./ProtectedRouter";
import Error404Page from "../Pages/Error404Page";


const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout />,
      // errorElement: <Error404Page />,
      children: [
         {
            index: true,
            element: <Home />,
         },
         {
            path: "about",
            element: <About />,
         },
        //  {
        //     path: "category/:CategoryID",
        //     element: <CategoryItems />,
        //  },
        //  {
        //     path: "product/:ProductID",
        //     element: <SingleProductPage />,
        //  },
        //  {
        //     path: "checkout",
        //     element: <Checkout />,
        //  },
         {
            element: <ProtectedRouter ProtectedRole="user" />,
            children: [
            //    {
            //       path: "profile",
            //       element: <UserProfile />,
            //    },
            ],
         },
         {
            path: "*",
            element: <Error404Page />,
         },
      ],
   },
   {
      path: "/login",
      element: <LoginPage />,
   },
]);

const AppRouter = () => {
   return <RouterProvider router={router} />;
};

export default AppRouter;
