import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../components/Header/Header";

const MainLayout = () => {
   return (
      <div className=" w-full  min-h-screen">
         <Header />
         <div className="mt-22 md:mt-40">


         <Outlet />
         </div>
         <Footer />
      </div>
   );
};

export default MainLayout;
