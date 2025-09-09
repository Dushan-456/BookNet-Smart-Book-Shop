import { Link } from "react-router-dom";
import "./ProductItem.css";
import Rating from "@mui/material/Rating";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductItem = ({
   ProductID,
   ProductImgURL,
   ProductTitle,
   Price,
   Discount,
   ratings,
   itemSold,
}) => {
   return (
      <div className="product-card w-full max-w-[280px] mx-auto rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
         <div className="relative w-full aspect-square">
            <Link to={`/product/${ProductID}`}>
               <img
                  className="product-img w-full h-full object-cover"
                  src={ProductImgURL}
                  alt={ProductTitle}
               />
            </Link>

            <Link to="/add2cart">
               <button className="absolute top-2 right-2 bg-white/80 rounded-full p-2 z-49 hover:bg-black hover:text-white transition">
                  <AddShoppingCartIcon fontSize="small" />
               </button>
            </Link>
         </div>

         <Link to={`/product/${ProductID}`} className="block px-3 py-2">
            <p className="text-sm font-medium text-gray-800 truncate">
               {ProductTitle}
            </p>

            <p className="text-sm mt-1">
               <span className="text-black font-semibold">
                  LKR {((Price * (100 - Discount)) / 100).toFixed(2)}
               </span>{" "}
               <span className="text-gray-400 line-through text-xs ml-1">
                  LKR {Price}.00
               </span>
               <span className="text-red-500 text-xs ml-2">-{Discount}%</span>
            </p>

            <div className="flex items-center text-sm mt-1">
               <Rating
                  name="half-rating-read"
                  defaultValue={ratings}
                  precision={0.1}
                  readOnly
                  size="small"
               />
               <span className="text-gray-600 text-xs ml-1">{ratings}</span>
               <span className="text-gray-500 text-xs ml-2">
                  | {itemSold}+ sold
               </span>
            </div>
         </Link>
      </div>
   );
};

export default ProductItem;
