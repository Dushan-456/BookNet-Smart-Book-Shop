
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
const CategoryRound = ({ CategoryID, CategoryImgURL, CategoryTitle }) => {
  return (
    <Link to={`/category/${CategoryID}`}>
      <div className="flex flex-col items-center justify-center">
        <IconButton sx={{ margin: "0", padding: "0" }}>
          <img
            className="rounded-full border-2 border-blue-500 p-1 h-16 w-16 object-cover md:h-20 md:w-20"
            src={CategoryImgURL}
            alt={CategoryTitle}
          />
        </IconButton>
        <p className="text-center text-xs md:text-[1em] leading-[1]">
          {" "}
          {CategoryTitle}
        </p>
      </div>
    </Link>
  );
};

export default CategoryRound;
