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
import "./Header.css";
import logo from "../../assets/Images/BookNet-Logo-Small-without-BG.png";
import UserIcon from "./UserIcon";
import { useNavigate } from "react-router-dom";
import HeaderNavMenu from "../Menus/HeaderNavMenu";
import SideDrawerMenu from "../Menus/SideDrawerMenu";
import HeaderCategories from "./HeaderCategories";

const pages = ["Products", "Pricing", "Blog"];

function Header() {
   const navigate = useNavigate();

   const [anchorElNav, setAnchorElNav] = React.useState(null);

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   return (
      <div  style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"}}>
         <div  className="container   py-1 px-2 m-auto">
            <div className="flex items-center">
               <IconButton
               
                  sx={{ borderRadius: 3,display: { xs: "none", md: "flex" } }}
                  onClick={() => navigate("/")}>
                  <img src={logo} width={"300px"} alt="BookNet Logo" />
               </IconButton>

               <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <SideDrawerMenu/>
                 
               </Box>
               <Typography
                  noWrap
        
                  sx={{
                     mr: 2,
                     display: { xs: "flex", md: "none" },
                     flexGrow: 1,
                  }}>
                  <IconButton
                     sx={{ borderRadius: 3 }}
                     onClick={() => navigate("/")}>
                     <img src={logo} width={"150px"} alt="BookNet Logo" className="" />
                  </IconButton>
               </Typography>
               <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  <div className="search">
                     <input
                        className="outline-none"
                        type="text"
                        placeholder="Search"
                     />
                     <IconButton color="black">
                        <SearchIcon />
                     </IconButton>
                  </div>
               </Box>

               <div >
                  <Tooltip title="Profile Details" >
                     <UserIcon />
                  </Tooltip>

                  <Tooltip title="Notifications" sx={{display: { xs: "none", md: "inline" }}}>
                     <IconButton
                     sx={{width:50,height:50}}
                        size="large"
                        color="inherit">
                        <Badge badgeContent={4} color="error">
                           <NotificationsIcon />
                        </Badge>
                     </IconButton>
                  </Tooltip>
                  <Tooltip title="Cart" >
                     <IconButton
                        onClick={() => navigate("/cart")}
                        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                        size="large"
                        color="inherit">
                        <Badge badgeContent={4} color="error">
                           <LocalMallIcon style={{ fontSize: "32px" }} />
                        </Badge>
                     </IconButton>
                  </Tooltip>
               </div>
            </div>
         </div>
         <div  className="container px-20 pb-2  m-auto hidden md:flex items-center justify-between" >
            <HeaderCategories/>
            <HeaderNavMenu />
         </div>
      </div>
   );
}
export default Header;
