import { Skeleton } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Mousewheel } from "swiper/modules";

const CategoryRoundSkeleton = () => {
    const isDesktop = useMediaQuery("(min-width:768px)");

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
        {Array.from({ length: 24 }).map((_, index) => (
          <SwiperSlide key={index}>
            <div className="mp-2">
              <Skeleton
                animation="wave"
                variant="circular"
                width={isDesktop ? 100 : 60}
                height={isDesktop ? 100 : 60}
              />
              <Skeleton animation="wave" variant="text" className="w-full" />

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CategoryRoundSkeleton;
