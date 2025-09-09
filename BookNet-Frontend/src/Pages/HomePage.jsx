import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../Components/Loading/Loading";
import Hero1 from "../Components/Hero/Hero1";
import CategoryItemsRound from "../Components/Categories/CategoryItemsRound";
import AllProducts from "../Components/Products/AllProducts";

const HomePage = () => {
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const timer = setTimeout(() => {
         setLoading(false);
      }, 1000); // 2 seconds fake loading

      return () => clearTimeout(timer); // cleanup
   }, []);

   if (loading) return <Loading />;

   return (
      <div >
         <div className="w-screen">
            <Hero1 />
         </div>
         <div className="container mx-auto">
            <CategoryItemsRound />
            <AllProducts/>
         </div>
      </div>
   );
};

export default HomePage;
