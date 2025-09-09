import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

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
    CategoryImgURL: "https://img.freepik.com/free-photo/notebooks-office-supplies_1232-2015.jpg?w=740",
    CategoryTitle: "Notebooks & Diaries",
  },
  {
    CategoryID: 22,
    CategoryImgURL: "https://img.freepik.com/free-photo/colorful-pens-stationery_1232-2190.jpg?w=740",
    CategoryTitle: "Pens & Pencils",
  },
  {
    CategoryID: 23,
    CategoryImgURL: "https://img.freepik.com/free-photo/office-paper-sheets_1232-2185.jpg?w=740",
    CategoryTitle: "Paper & Files",
  },
  {
    CategoryID: 24,
    CategoryImgURL: "https://img.freepik.com/free-photo/school-art-supplies_1232-2010.jpg?w=740",
    CategoryTitle: "Art & Craft Supplies",
  },
  {
    CategoryID: 25,
    CategoryImgURL: "https://img.freepik.com/free-photo/school-supplies-ruler-scissors_1232-2070.jpg?w=740",
    CategoryTitle: "School Supplies",
  },
  {
    CategoryID: 26,
    CategoryImgURL: "https://img.freepik.com/free-photo/office-supplies-stapler_1232-2055.jpg?w=740",
    CategoryTitle: "Office Supplies",
  },
  {
    CategoryID: 27,
    CategoryImgURL: "https://img.freepik.com/free-photo/backpack-with-school-supplies_1232-2105.jpg?w=740",
    CategoryTitle: "Bags & Backpacks",
  },
  {
    CategoryID: 28,
    CategoryImgURL: "https://img.freepik.com/free-photo/sticky-notes-reminders_1232-2117.jpg?w=740",
    CategoryTitle: "Sticky Notes & Planners",
  },
];

const HeaderCategories = () => {
   const [open, setOpen] = useState(false);
   const dropdownRef = useRef(null);
   const navigate = useNavigate();

   const handleCategoryClick = (id) => {
      setOpen(false);
      navigate(`/category/${id}`);
   };

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
         ) {
            setOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
         document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   return (
      <div className=" relative inline-block text-left" ref={dropdownRef}>
         <button
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-4 py-2  hover:bg-gray-200 rounded-4xl">
            <MenuIcon />
            <span className="font-bold">All Categories</span>
         </button>

         {open && (
            <div className="custom-scroll absolute z-50 mt-2 w-max max-h-[80vh] overflow-y-scroll  bg-white border border-gray-200 rounded-md shadow-lg">
               {categoryitems.map((cat) => (
                  <button
                     key={cat.CategoryID}
                     onClick={() => handleCategoryClick(cat.CategoryID)}
                     className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100">
                     <img
                        src={cat.CategoryImgURL}
                        alt={cat.CategoryTitle}
                        className="w-10 h-10 rounded-full mr-3"
                     />
                     <span>{cat.CategoryTitle}</span>
                  </button>
               ))}
            </div>
         )}
      </div>
   );
};

export default HeaderCategories;
