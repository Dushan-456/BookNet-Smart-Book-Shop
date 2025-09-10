import { Link } from "react-router-dom";
import "./ProductItem.css";
import Rating from "@mui/material/Rating";
import Chip from '@mui/material/Chip';

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductItem = ({
  id,
  imageUrl, // Renamed from ProductImgURL to imageUrl
  title, // Renamed from ProductTitle to name
  price, // Renamed from Price to price
  salePrice, // Renamed from Price to price
}) => {
  return (
    // Adjusted max-w to provide better spacing on smaller screens
    <div className="product-card w-full max-w-xs mx-auto rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative w-full aspect-square">
        <Link to={`/product/${id}`}>
          <img
            className="product-img w-full h-full object-cover"
            src={imageUrl}
            alt={title}
          />
        </Link>
        {salePrice?(

           <Chip color="success" label="Sale" className="absolute  top-2 left-2" />
        ):("")}


        {/* Add to Cart button */}
        <button
          // Consider replacing <Link> with a button and an onClick handler
          // for adding to cart, as it's an action, not a navigation.
          onClick={() => console.log(`Add product ${id} to cart`)}
          className="absolute top-2 right-2 bg-white/80 rounded-full p-2 text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-200 z-10"
          aria-label={`Add ${title} to cart`}
        >
          <AddShoppingCartIcon fontSize="small" />
        </button>
      </div>

      <Link to={`/product/${id}`} className="block px-3 py-2">
        <p className="text-base font-semibold text-gray-800 truncate leading-tight mb-1">
          {" "}
          {title}
        </p>

        <div className="flex items-baseline mb-1">
          {salePrice > 0 ? (
            <>
              <span className="text-lg font-bold text-black">
                LKR {salePrice}
              </span>
              <span className="text-red-400 line-through text-sm ml-2">
                LKR {price}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-black">LKR {price}</span>
          )}
        </div>

        {/* <div className="flex items-center text-sm">
          <Rating
            name={`product-rating-${ProductID}`}
            value={ratings}
            precision={0.1}
            readOnly
            size="small"
          />
          <span className="text-gray-600 text-xs ml-1">({ratings})</span>
          <span className="text-gray-500 text-xs ml-2">| {itemSold} sold</span>
        </div> */}
      </Link>
    </div>
  );
};

export default ProductItem;
