import { useEffect } from "react";
import { useState } from "react";
import Loading from "../Components/Loading/Loading";
import Hero1 from "../Components/Hero/Hero1";
import CategoryItemsRound from "../Components/Categories/CategoryItemsRound";
import Products from "../Components/Products/Products";


const HomePage = () => {
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const timer = setTimeout(() => {
         setLoading(false);
      }, 200); //  fake loading

      return () => clearTimeout(timer); // cleanup
   }, []);

   if (loading) return <Loading />;

   return (
      <div >
         <div className="w-screen -mt-5">
            <Hero1 />
         </div>
         <div className="container mx-auto">
            <CategoryItemsRound />
            <Products/>

         </div>
      </div>
   );
};

export default HomePage;
