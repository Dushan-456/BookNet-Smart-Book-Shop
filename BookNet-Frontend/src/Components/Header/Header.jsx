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
import { Link, useNavigate } from "react-router-dom";
import HeaderNavMenu from "../Menus/HeaderNavMenu";

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
      <AppBar position="static" color="white">
         <Container maxWidth="lg">
            <Toolbar disableGutters>
               <IconButton
                  sx={{ borderRadius: 3 }}
                  onClick={() => navigate("/")}>
                  <img src={logo} width={"300px"} alt="BookNet Logo" />
               </IconButton>

               <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                     size="large"
                     aria-label="account of current user"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     onClick={handleOpenNavMenu}
                     color="inherit">
                     <MenuIcon />
                  </IconButton>
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                     }}
                     open={Boolean(anchorElNav)}
                     onClose={handleCloseNavMenu}
                     sx={{ display: { xs: "block", md: "none" } }}>
                     {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                           <Typography sx={{ textAlign: "center" }}>
                              {page}
                           </Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
               <Typography
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                     mr: 2,
                     display: { xs: "flex", md: "none" },
                     flexGrow: 1,
                  }}>
                  <IconButton
                     sx={{ borderRadius: 3 }}
                     onClick={() => navigate("/")}>
                     <img src={logo} width={"150px"} alt="BookNet Logo" />
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

               <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Profile Details">
                     <UserIcon />
                  </Tooltip>

                  <Tooltip title="Notifications">
                     <IconButton
                        size="large"
                        color="inherit">
                        <Badge badgeContent={4} color="error">
                           <NotificationsIcon />
                        </Badge>
                     </IconButton>
                  </Tooltip>
                  <Tooltip title="Cart">
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
               </Box>
            </Toolbar>
         </Container>
         <Container>
            <HeaderNavMenu />
         </Container>
      </AppBar>
   );
}
export default Header;
