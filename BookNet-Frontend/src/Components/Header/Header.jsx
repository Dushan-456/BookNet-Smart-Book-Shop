import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import logo from "../../assets/Images/BookNet-Logo-Small-without-BG.png";
import UserIcon from "./UserIcon";
import { useNavigate } from "react-router-dom";
import HeaderNavMenu from "../Menus/HeaderNavMenu";
import SideDrawerMenu from "../Menus/SideDrawerMenu";
import HeaderCategories from "./HeaderCategories";


function Header() {
  const navigate = useNavigate();


  return (
    <div className="sticky backdrop-blur-xl top-0 w-full z-50 bg-[#ffffff80]"

      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
    >
      <div className="container px-2 m-auto">
        <div className="flex items-center">
          <IconButton
            sx={{ borderRadius: 3, display: { xs: "none", md: "flex" } }}
            onClick={() => navigate("/")}
          >
            <img src={logo} width={"300px"} alt="BookNet Logo" />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <SideDrawerMenu />
          </Box>
          <Typography
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <IconButton sx={{ borderRadius: 3 }} onClick={() => navigate("/")}>
              <img src={logo} width={"150px"} alt="BookNet Logo" className="" />
            </IconButton>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <div className=" border-1 rounded-3xl w-full mx-20 flex items-center justify-between ps-5">
              <input
                className="outline-none w-full"
                type="text"
                placeholder="Search Your Product..."
              />
              <IconButton color="black">
                <SearchIcon />
              </IconButton>
            </div>
          </Box>

          <div className="flex items-center">
            <div>
              <UserIcon />
            </div>

            <div className="hidden md:block">
              <IconButton
                sx={{
                  width: 50,
                  height: 50,
                  marginRight: "10px",
                }}
                size="large"
                color="inherit"
                onClick={() => navigate("/notifications")}
              >
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </div>
            <div>
              <IconButton
                onClick={() => navigate("/cart")}
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                size="large"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <LocalMallIcon style={{ fontSize: "32px" }} />
                </Badge>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <div className="container px-20 pb-1 m-auto hidden md:flex items-center justify-between">
        <HeaderCategories />
        <HeaderNavMenu />
      </div>
    </div>
  );
}
export default Header;
