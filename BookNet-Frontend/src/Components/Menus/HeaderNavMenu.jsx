import { NavLink } from "react-router-dom";
import "./HeaderNavMenu.css";
import IconButton from "@mui/material/IconButton";

const HeaderNavMenu = () => {
  return (
    <div className="navmenu">
      <IconButton className="nav-link">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Home
        </NavLink>
      </IconButton>
      <IconButton className="nav-link">
        <NavLink
          to="/about"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          About Us
        </NavLink>
      </IconButton>
      <IconButton className="nav-link">
        <NavLink
          to="/contact"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Contact
        </NavLink>
      </IconButton>
      <IconButton className="nav-link">
        <NavLink
          to="/categories/book"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          books
        </NavLink>
      </IconButton>
      <IconButton className="nav-link">
        <NavLink
          to="/categories/stationery"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Stationery Items
        </NavLink>
      </IconButton>
      <IconButton className="nav-link">
        <NavLink
          to="/services"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Services
        </NavLink>
      </IconButton>
    </div>
  );
};

export default HeaderNavMenu;
