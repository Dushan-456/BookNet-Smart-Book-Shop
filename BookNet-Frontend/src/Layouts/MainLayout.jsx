import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/footer";
import Header from "../Components/Header/Header";

const MainLayout = () => {
   return (
      <div className=" w-full overflow-hidden min-h-screen" >
         <Header />
         <div className="container mx-auto">
            <Outlet />
         </div>
         <Footer />
      </div>
   );
};

export default MainLayout;
