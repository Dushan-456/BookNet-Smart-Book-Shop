import { Link } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const FooterColumn3 = () => {
  return (
    <div className=" md:flex-3 flex flex-col items-center p-5 gap-5 ">
      <h2 className="text-2xl text-center font-semibold">Quick Links</h2>
      <ul>
        <Link to="/">
          <li>
            <KeyboardDoubleArrowRightIcon />
            home
          </li>
        </Link>
        <Link to="/about">
          <li>
            {" "}
            <KeyboardDoubleArrowRightIcon />
            About BookNet
          </li>
        </Link>
        <Link to="/contact">
          <li>
            {" "}
            <KeyboardDoubleArrowRightIcon />
            contact BookNet
          </li>
        </Link>
        <Link to="/categories">
          <li>
            {" "}
            <KeyboardDoubleArrowRightIcon />
            Categories
          </li>
        </Link>
        <Link to="/products">
          <li>
            {" "}
            <KeyboardDoubleArrowRightIcon />
            All Products
          </li>
        </Link>
        <Link to="/help">
          <li>
            {" "}
            <KeyboardDoubleArrowRightIcon />
            help
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default FooterColumn3;
