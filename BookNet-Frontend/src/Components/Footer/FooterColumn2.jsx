import { Link } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const FooterColumn2 = () => {
  return (
    <div className=" md:flex-3 flex flex-col items-center p-5 gap-5">
      <h2 className="text-2xl text-center font-semibold">Services</h2>
      <div>
        <ul>
          <Link to="/services">
            <li>
              <KeyboardDoubleArrowRightIcon />
              Print Outs
            </li>
          </Link>
          <Link to="/services">
            <li>
              {" "}
              <KeyboardDoubleArrowRightIcon />
              Photo Copies
            </li>
          </Link>
          <Link to="/services">
            <li>
              {" "}
              <KeyboardDoubleArrowRightIcon />
              type Settings
            </li>
          </Link>
          <Link to="/services">
            <li>
              {" "}
              <KeyboardDoubleArrowRightIcon />
              Laminating
            </li>
          </Link>
          <Link to="/services">
            <li>
              {" "}
              <KeyboardDoubleArrowRightIcon />
              Print Outs
            </li>
          </Link>
          <Link to="/services">
            <li>
              {" "}
              <KeyboardDoubleArrowRightIcon />
              Print Outs
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default FooterColumn2;
