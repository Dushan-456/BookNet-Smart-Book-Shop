import React, { useState, useEffect } from "react";
import API from "../../API/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Mousewheel } from "swiper/modules";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Box, CircularProgress, Typography, Alert } from "@mui/material"; // For loading/error UI

const CategoryItemsRound = () => {
   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchCategories = async () => {
         try {
            setLoading(true);
            setError(null);
            const res = await API.get("/categories");
            setCategories(res.data);
         } catch (err) {
            console.error("Error fetching categories for Swiper:", err);
            setError("Failed to load categories.");
         } finally {
            setLoading(false);
         }
      };

      fetchCategories();
   }, []);

   if (loading) {
      return (
         <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <CircularProgress size={24} />
         </Box>
      );
   }

   if (error) {
      return (
         <Box sx={{ p: 2 }}>
            <Alert severity="error">{error}</Alert>
         </Box>
      );
   }

   if (categories.length === 0 && !loading && !error) {
      return (
         <Box sx={{ p: 2 }}>
            <Typography variant="body1" color="textSecondary" align="center">
               No categories available.
            </Typography>
         </Box>
      );
   }

   return (
      <section className="mt-5">
         <Swiper
            slidesPerView={10}
            grid={{
               rows: 1,
            }}
            spaceBetween={10}
            pagination={{
               clickable: false,
            }}
            mousewheel={true}
            modules={[Grid, Mousewheel]}
            breakpoints={{
               0: {
                  // mobile 
                  slidesPerView: 5,
               },
               640: {
                  // tablet
                  slidesPerView: 4,
               },
               1024: {
                  // desktop
                  slidesPerView: 10,
               },
            }}>
            {categories.map(( category ) => (
                  <SwiperSlide key={category.id}>
                     {" "}
                     <CategoryItems
                        CategoryID={category.id} 
                        CategoryImgURL={
                           category.image ||
                           "https://via.placeholder.com/80?text=No+Image"
                        } 
                        CategoryTitle={category.name} 
                     />
                  </SwiperSlide>
               )
            )}
         </Swiper>
      </section>
   );
};

export default CategoryItemsRound;

const CategoryItems = ({ CategoryID, CategoryImgURL, CategoryTitle }) => (
   <Link to={`/category/${CategoryID}`}>
      <div className="flex flex-col items-center justify-center">
         <IconButton sx={{ margin: "0", padding: "0" }}>
            <img
               className="rounded-full border-2 border-blue-500 p-1 h-16 w-16 object-cover md:h-20 md:w-20"
               src={CategoryImgURL}
               alt={CategoryTitle}
            />
         </IconButton>
         <p className="text-center text-xs md:text-[1em] leading-[1]">
            {" "}
            {CategoryTitle}
         </p>
      </div>
   </Link>
);
