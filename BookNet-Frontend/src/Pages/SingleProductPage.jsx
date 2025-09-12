
import { Skeleton } from "@mui/material";
import ImagesGallery from "../Components/SingleProductPage/ImagesGallery";
import ProductDetails from "../Components/SingleProductPage/ProductDetails";
import StickyCard from "../Components/SingleProductPage/StickyCard";

const SingleProductPage = () => {
  return (
    <div className="w-7xl m-auto pt-2">
      <div className="section1 mt-3 flex ">
        <div className="flex-3/4">
          <div className=" flex mb-5">
            <div className="images flex-2/5 ">
              <ImagesGallery />
            </div>
            <div className="flex-3/5 m-3">
              <ProductDetails
                price={25000}
                salePrice={1140}
                Discount={25}
                title={
                  "nnvkfnvkndfkvnkdnfvkn fnvnnvknfem envin  knknknk nknkn nkn no knnk "
                }
              />
            </div>
          </div>
          <hr className=" text-[#b7bbbb83] shadow-2xl" />
          <div className="h-screen">
            <h1>reviews</h1>
            <Skeleton className="!h-96 !rounded-2xl" />
          </div>
        </div>
        <div className="pt-9  flex-1/4">
          <div
            className=" sticky top-45 rounded-xl"
            style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
          >
            <StickyCard price={18750} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
