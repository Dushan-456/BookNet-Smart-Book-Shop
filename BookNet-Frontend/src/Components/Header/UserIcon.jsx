import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const UserIcon = () => {
   const [open, setOpen] = useState(false);
   const [authenticate, setAuthenticate] = useState(true);
   const dropdownRef = useRef(null);
   const navigate = useNavigate();

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
         ) {
            setOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
         document.removeEventListener("mousedown", handleClickOutside);
   }, []);
   return (
      <div className=" relative inline-block text-left" ref={dropdownRef}>
         {authenticate ? (
            <IconButton color="inherit" onClick={() => setOpen(!open)}>
               <Avatar
                  alt="Remy Sharp"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s"
                  sx={{ border: "2px solid #6841f3" }}
               />
            </IconButton>
         ) : (
            <IconButton color="inherit" onClick={() => setOpen(!open)}>
               <AccountCircleIcon style={{ fontSize: "30px" }} />
            </IconButton>
         )}

         {open && (
            <div className="custom-scroll absolute z-50 mt-2 w-max h-min   bg-white border border-gray-200 rounded-md shadow-lg">
               {authenticate ? (
                  <div className="p-5">
                     <div className="flex items-center gap-2 mb-2 ">
                        <Avatar
                           alt="Remy Sharp"
                           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s"
                           sx={{ width: 50, height: 50 }}
                        />{" "}
                        <div>
                           <p>Welcome Back</p>{" "}
                           <h3 className="text-lg font-bold">Navodya Dushan</h3>
                        </div>
                     
                     </div>
                     <hr />
                     <button className="flex items-center cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100">
                        <span>My Address</span>
                     </button>
                     <button className="flex items-center cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100">
                        <span>Settings</span>
                     </button>
                     <button className="flex items-center cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100">
                        <span>Orders</span>
                     </button>
                     <button className="flex justify-center cursor-pointer mt-2 items-center rounded-xl w-full bg-[#6841f3] text-white text-left px-4 py-2 hover:bg-[#3a305a]">
                        <span className="text-center">Go to Profile</span>
                     </button>
                  </div>
               ) : (
                  <div className="p-5">
                     <div className="flex items-center gap-2 mb-2 ">
                        <p>Welcome to</p>{" "}
                        <h3 className="text-lg font-bold">clickSHOP</h3>
                     </div>
                     <hr />

                     <button
                        onClick={() => navigate("/login")}
                        className="cursor-pointer flex justify-center mt-5 rounded-xl items-center w-full bg-[#000000] text-white text-left px-4 py-2 hover:bg-[#3a305a]">
                        <span className="text-center">Login</span>
                     </button>
                     <button className="flex cursor-pointer justify-center mt-5 rounded-xl items-center w-full bg-[#6841f3] text-white text-left px-4 py-2 hover:bg-[#3a305a]">
                        <span className="text-center">Register</span>
                     </button>
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default UserIcon;
