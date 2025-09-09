import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className=" w-full overflow-hidden min-h-screen">
      <Header />
      <div className="container mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
