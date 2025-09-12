import "./ProductDetails.css";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";

const ProductDetails = ({

  title,
  price,
  salePrice,
  ratings = 0,
  itemSold = 0,
  Discount = 0,
}) => {
  return (
    <div>
      <div className="bg-gray-500 flex items-center justify-between p-1 rounded-md px-5 text-white font-bold">
        <h4>Category - Books</h4>
        <h4>Category - Books</h4>
      </div>
      <h3 className="product-price">
        <span className="currency">LKR </span>
        {(price * (100 - Discount)) / 100}.00{" "}
        <span className="product-old-price">{price}.00</span>
        {Discount > 0 && salePrice !== null && salePrice < price && (
          <Chip
            label={`-${Discount}%`}
            color="error"
            size="small"
            className="absolute top-2 left-2  z-20"
          /> // Adjust ml-14 to place it next to "Sale"
        )}
        <span className="product-discount"> -{Discount}% OFF</span>
      </h3>
      <span className="small-texts">
        Tax excluded, add at checkout if applicable
      </span>
      <h3 className="product-title pt-3 pb-1">{title}</h3>

      <div className="flex align-middle">
        <Rating
          name="half-rating-read"
          defaultValue={3.8}
          precision={0.1}
          readOnly
          size="small"
        />
        <span className="rate ">{3.5}</span>
        <span className="rate mr-5 ml-2 font-bold"> {255}Reviews</span>
        <span className="sold"> | {2555}+ sold</span>
      </div>
      <hr />
      <div>
        <h3 className="font-bold text-xl">Size :</h3>
        <Chip label="S" variant="outlined" />
        <Chip label="M" variant="outlined" />
        <Chip label="L" variant="outlined" />
        <Chip label="XL" variant="outlined" />
        <Chip label="2XL" variant="outlined" />
      </div>
      <div>
        <h3 className="font-bold text-xl">Colour :</h3>
        <Chip label="S" variant="outlined" />
        <Chip label="M" variant="outlined" />
        <Chip label="L" variant="outlined" />
        <Chip label="XL" variant="outlined" />
        <Chip label="2XL" variant="outlined" />
      </div>
    </div>
  );
};

export default ProductDetails;
