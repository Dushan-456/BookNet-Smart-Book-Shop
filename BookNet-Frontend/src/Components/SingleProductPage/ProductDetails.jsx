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
        <h4>Type - Books</h4>
      </div>
      {salePrice !== null && salePrice < price ? ( // Check if salePrice is valid and lower
        <h3 className="text-4xl font-bold">
          <span className="text-3xl">LKR </span> {salePrice.toFixed(2)}{" "}
          <span className="text-2xl font-normal text-gray-400 line-through">
            LKR {price.toFixed(2)}
          </span>
          {Discount > 0 && salePrice !== null && salePrice < price && (
            <span className="text-red-400  text-xs md:text-2xl ml-2">
              -{Discount}% OFF
            </span>
          )}
        </h3>
      ) : (
        <h3 className="text-4xl font-bold">
          <span className="text-3xl">LKR</span> {price.toFixed(2)}
        </h3>
      )}

      <span className="text-sm text-gray-500">
        Tax excluded, add at checkout if applicable
      </span>
      <h3 className="text-2xl pt-3 pb-1">{title}</h3>

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
      <hr className=" text-[#b7bbbb83] shadow-2xl" />
      <div>
        <p className="font-bold" >Discription :</p>
        <p>

        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum, eum minima quis possimus impedit obcaecati? Aut officiis laudantium optio facere dolor, quam eius, corrupti enim laborum hic vero. Ab aspernatur perferendis doloremque animi rem laborum et aut, ut ad ducimus cupiditate modi officiis eos. Vitae facere eligendi ducimus corrupti natus!
        </p>
      </div>
      {/* <div>
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
      </div> */}
    </div>
  );
};

export default ProductDetails;
