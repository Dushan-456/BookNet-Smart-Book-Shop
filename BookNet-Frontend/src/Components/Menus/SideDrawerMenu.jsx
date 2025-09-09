import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";

import { Avatar } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../Context/AuthContext";



export default function SideDrawerMenu() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setOpen(open);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
        setOpen(false);
    };

    return (
        <div>

            <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                color="inherit"
            >
                <MenuIcon sx={{ fontSize: 35 }} />
            </IconButton>

            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                {isAuthenticated ? (
                    <div className="mx-1">
                        <div className="flex items-center">
                            <IconButton color="inherit" onClick={() => setOpen(!open)}>
                                <Avatar

                                    src={user?.Profile?.image || ""}
                                    sx={{ border: "3px solid #6841f3", width: 50, height: 50 }}
                                />


                            </IconButton>
                            <div>

                                <p>Welcome Back</p>
                                <p>{user.firstName}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex justify-center cursor-pointer mt-2 items-center rounded-xl w-full bg-[#ff0000] text-white text-left px-4 py-2 hover:bg-[#3a305a]">
                            <span className="text-center">Log Out</span>
                        </button>
                    </div>
                ) : (
                    <div className="p-4">
                        <div className="flex items-center gap-2 mb-2 ">
                            <p>Welcome to</p>{" "}
                            <h3 className="text-lg font-bold">BookNet</h3>
                        </div>
                        <button
                            onClick={() => {
                                navigate("/login");
                                setOpen(false);
                            }}
                            className=" rounded-xl mb-5 w-full bg-[#dda408] text-white   py-1 ">
                            <span className="text-center">Login</span>
                        </button><br />
                        <button
                            onClick={() => {
                                navigate("/register");
                                setOpen(false);
                            }}
                            className=" rounded-xl w-full bg-[#0e0ca1] text-white  py-1">
                            <span className="text-center">Register</span>
                        </button>
                    </div>
                )}
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >

                    <List>
                        <ListItem >
                            <ListItemButton component={Link} to="/" >
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                Home
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem >
                            <ListItemButton component={Link} to="/about">
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                About Us
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem >
                            <ListItemButton component={Link} to="/contact">
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                Contact
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem >
                            <ListItemButton component={Link} to="/books">
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                Books
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem >
                            <ListItemButton component={Link} to="/tationery">
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                Stationery Items
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem >
                            <ListItemButton component={Link} to="/services">
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                Services
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem >
                            <ListItemButton component={Link} to="/profile">
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                My Profile
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </List>

                </Box>
            </Drawer>

        </div>
    );
}
