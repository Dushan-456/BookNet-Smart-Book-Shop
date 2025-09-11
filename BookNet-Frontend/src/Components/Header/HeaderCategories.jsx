import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import API from "../../API/api";



const HeaderCategories = () => {
   const [open, setOpen] = useState(false);
   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
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
      const fetchCategories = async () => {
         try {
            setLoading(true);
            setError(null);
            const res = await API.get("/categories");
            setCategories(res.data); // res.data is expected to be an array of category objects
         } catch (err) {
            console.error("Error fetching categories for Swiper:", err);
            setError("Failed to load categories.");
         } finally {
            setLoading(false);
         }
      };

      fetchCategories();
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
            <>

               <div className="custom-scroll absolute z-50 mt-2 w-max max-h-[80vh] overflow-y-scroll  bg-white border border-gray-200 rounded-md shadow-lg">
                  {categories.map((cat) => (
                     <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100">
                        <img
                           src={cat.image}
                           alt={cat.CategoryTitle}
                           className="w-10 h-10 rounded-full mr-3"
                        />
                        <span>{cat.name}</span>
                     </button>
                  ))}
               </div>
            </>
         )}
      </div>
   );
};

export default HeaderCategories;
