// src/Components/ProductItem/ProductItem.jsx
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductItem = ({
   id,
   imageUrl,
   title,
   price,
   salePrice,
   ratings = 0, // Add default prop for safety
   itemSold = 0, // Add default prop for safety
   Discount = 0, // Add default prop for safety
}) => {
   // Calculate display price
   const originalPriceDisplay = price; // Always display original price for strikethrough

   return (
      <div className="product-card  max-w-xs  rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 m-2 ">
         <div className="relative w-full aspect-square">
            <Link to={`/product/${id}`}>
               <img
                  className="product-img w-full h-full object-cover m-1"
                  src={imageUrl}
                  alt={title}
               />
            </Link>

            {/* Show Discount Chip if a percentage is passed */}
            {Discount > 0 && salePrice !== null && salePrice < price && (
               <Chip
                  label={`-${Discount}%`}
                  color="error"
                  size="small"
                  className="absolute top-2 left-2  z-20"
               /> // Adjust ml-14 to place it next to "Sale"
            )}

            <button
               onClick={() => console.log(`Add product ${id} to cart`)}
               className="absolute top-2 right-2 bg-white/80 rounded-full p-2 text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-200 z-10"
               aria-label={`Add ${title} to cart`}>
               <AddShoppingCartIcon fontSize="small" />
            </button>
         </div>

         <Link to={`/product/${id}`} className="block px-3 py-2">
            <p className="text-base font-semibold text-gray-800 truncate leading-tight mb-1">
               {title}
            </p>

            <div className="flex items-baseline mb-1">
               {salePrice !== null && salePrice < price ? ( // Check if salePrice is valid and lower
                  <>
                     <span className="text-sm md:text-lg font-bold text-black">
                        LKR {salePrice.toFixed(2)}
                     </span>
                     <span className="text-red-400 line-through text-xs md:text-sm ml-2">
                        LKR {originalPriceDisplay.toFixed(2)}
                     </span>
                  </>
               ) : (
                  <span className="text-sm md:text-lg font-bold text-black">
                     LKR {price.toFixed(2)}
                  </span>
               )}
            </div>
            {itemSold > 0 && (
               <div className="flex items-center text-sm">
                  <Rating
                     name={`product-rating-${id}`}
                     value={ratings}
                     precision={0.1}
                     readOnly
                     size="small"
                  />
                  <span className="text-gray-600 text-xs ml-1">
                     ({ratings.toFixed(1)})
                  </span>
                  <span className="text-gray-500 text-xs ml-2">
                     | {itemSold} sold
                  </span>
               </div>
            )}
         </Link>
      </div>
   );
};

export default ProductItem;
