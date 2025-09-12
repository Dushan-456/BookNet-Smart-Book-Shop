import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../components/Header/Header";

const MainLayout = () => {
   return (
      <div className=" w-full  ">
         <Header />


         <Outlet />
         <Footer />
      </div>
   );
};

export default MainLayout;
