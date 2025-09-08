import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/footer";
import Header from "../Components/Header/Header";

const MainLayout = () => {
   return (
      <div className="w-full h-screen">
         <Header />
         <div className="">
            <Outlet />
         </div>
         <Footer />
      </div>
   );
};

export default MainLayout;
