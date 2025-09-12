import Skeleton from "@mui/material/Skeleton";

const ProductItemSkeleton = () => {
  return (
    <div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {Array.from({ length: 24 }).map((_, index) => (
        <div
          key={index}
          className="  max-w-xs px-2 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 m-2 "
        >
          <Skeleton animation="wave" className="!h-80 !-my-10" />
          <Skeleton animation="wave" />

          <div className="flex gap-3">
            <Skeleton animation="wave" variant="text" className="flex-1/2" />
            <Skeleton animation="wave" variant="text" className="flex-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductItemSkeleton;
