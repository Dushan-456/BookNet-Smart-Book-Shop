// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Mousewheel } from "swiper/modules";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

const categoryitems = [
   {
      CategoryID: 1,
      CategoryImgURL:
         "https://img.freepik.com/free-photo/open-book-library_1232-2876.jpg?w=740",
      CategoryTitle: "Fiction",
   },
   {
      CategoryID: 2,
      CategoryImgURL:
         "https://img.freepik.com/free-photo/stack-books-education_1232-2107.jpg?w=740",
      CategoryTitle: "Non-Fiction",
   },
   {
      CategoryID: 3,
      CategoryImgURL:
         "https://img.freepik.com/free-photo/child-reading-book_1098-18086.jpg?w=740",
      CategoryTitle: "Children's Books",
   },
   {
      CategoryID: 4,
      CategoryImgURL:
         "https://img.freepik.com/free-photo/teenage-girl-reading-book_1098-17613.jpg?w=740",
      CategoryTitle: "Young Adult",
   },
   {
      CategoryID: 5,
      CategoryImgURL:
         "https://img.freepik.com/free-photo/hardback-book-textbook_1150-11031.jpg?w=740",
      CategoryTitle: "Educational & Textbooks",
   },
   {
      CategoryID: 6,
      CategoryImgURL:
         "https://img.freepik.com/free-photo/research-science-book_1232-1544.jpg?w=740",
      CategoryTitle: "Science & Technology",
   },
   {
      CategoryID: 21,
      CategoryImgURL:
         "https://img.freepik.com/free-photo/notebooks-office-supplies_1232-2015.jpg?w=740",
      CategoryTitle: "Notebooks & Diaries",
   },
   {
      CategoryID: 22,
      CategoryImgURL:
         "https://img.freepik.com/free-photo/colorful-pens-stationery_1232-2190.jpg?w=740",
      CategoryTitle: "Pens & Pencils",
   },
   {
      CategoryID: 23,
      CategoryImgURL:
         "https://img.freepik.com/free-photo/office-paper-sheets_1232-2185.jpg?w=740",
      CategoryTitle: "Paper & Files",
   },
   {
      CategoryID: 24,
      CategoryImgURL:
         "https://img.freepik.com/free-photo/school-art-supplies_1232-2010.jpg?w=740",
      CategoryTitle: "Art & Craft Supplies",
   },
   {
      CategoryID: 25,
      CategoryImgURL:
         "https://img.freepik.com/free-photo/school-supplies-ruler-scissors_1232-2070.jpg?w=740",
      CategoryTitle: "School Supplies",
   },
   {
      CategoryID: 26,
      CategoryImgURL:
         "https://img.freepik.com/free-photo/office-supplies-stapler_1232-2055.jpg?w=740",
      CategoryTitle: "Office Supplies",
   },
   {
      CategoryID: 27,
      CategoryImgURL:
         "https://img.freepik.com/free-photo/backpack-with-school-supplies_1232-2105.jpg?w=740",
      CategoryTitle: "Bags & Backpacks",
   },
   {
      CategoryID: 28,
      CategoryImgURL:
         "https://img.freepik.com/free-photo/sticky-notes-reminders_1232-2117.jpg?w=740",
      CategoryTitle: "Sticky Notes & Planners",
   },
];

const CategoryItemsRound = () => {
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
                  // mobile (default)
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
           
            {categoryitems.map(
               ({ CategoryID, CategoryImgURL, CategoryTitle }, index) => (
                  <SwiperSlide key={index}>
                     <CategoryItems
                        CategoryID={CategoryID}
                        CategoryImgURL={CategoryImgURL}
                        CategoryTitle={CategoryTitle}
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
         <p className="text-center text-xs md:text-[1em]  leading-[1]">
            {" "}
            {CategoryTitle}
         </p>
      </div>
   </Link>
);
