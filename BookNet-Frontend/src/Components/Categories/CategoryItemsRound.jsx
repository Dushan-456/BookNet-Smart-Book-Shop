import React, { useState, useEffect } from "react";
import API from "../../API/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Mousewheel } from "swiper/modules";

import { Box, Typography, Alert } from "@mui/material"; // For loading/error UI
import CategoryRound from "./CategoryRound";
import CategoryRoundSkeleton from "./CategoryRoundSkeleton";

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
    return <CategoryRoundSkeleton />;
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
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            {" "}
            <CategoryRound
              CategoryID={category.id}
              CategoryImgURL={
                category.image || "https://via.placeholder.com/80?text=No+Image"
              }
              CategoryTitle={category.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CategoryItemsRound;
