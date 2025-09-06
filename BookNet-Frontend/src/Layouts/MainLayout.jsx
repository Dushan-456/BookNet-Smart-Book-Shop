import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/footer";

const MainLayout = () => {
   return (
      <div className="w-full h-screen">
         <Header />
         <div className="mt-30">
            <Outlet />
         </div>
         <Footer />
      </div>
   );
};

export default MainLayout;
