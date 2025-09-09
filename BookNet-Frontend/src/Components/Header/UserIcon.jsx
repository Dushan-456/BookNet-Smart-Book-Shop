import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "@mui/material";
import { useAuth } from "../../Context/AuthContext";

const UserIcon = () => {
   const { isAuthenticated, user, logout } = useAuth();

   const [open, setOpen] = useState(false);
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

   const handleLogout = () => {
      logout();
      navigate("/login");
      setOpen(false);
   };

   function stringToColor(string) {
      let hash = 0;
      let i;

      /* eslint-disable no-bitwise */
      for (i = 0; i < string.length; i += 1) {
         hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }

      let color = "#";

      for (i = 0; i < 3; i += 1) {
         const value = (hash >> (i * 8)) & 0xff;
         color += `00${value.toString(16)}`.slice(-2);
      }
      /* eslint-enable no-bitwise */

      return color;
   }

   function stringAvatar(name) {
      return {
         sx: {
            bgcolor: stringToColor(name),
         },
         children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
      };
   }
   return (
      <div className=" relative inline-block text-left" ref={dropdownRef}>
         {isAuthenticated ? (
            <IconButton color="inherit" onClick={() => setOpen(!open)}>
               <Avatar
                  {...stringAvatar(user.firstName + " " + user.lastName)}
                  src={user?.Profile?.image || ""}
                  sx={{ border: "3px solid #6841f3", width: 45, height: 45 }}
               />
            </IconButton>
         ) : (
            <IconButton color="inherit" onClick={() => setOpen(!open)}>
               <Avatar />
            </IconButton>
         )}

         {open && (
            <div className="custom-scroll absolute z-50 mt-2 w-max h-min   bg-white border border-gray-200 rounded-md shadow-lg">
               {isAuthenticated ? (
                  <div className="p-5">
                     <div className="flex items-center gap-2 mb-2 w-60 overflow-hidden">
                        <Avatar
                           {...stringAvatar(
                              user.firstName + " " + user.lastName
                           )}
                           src={user?.Profile?.image || ""}
                           sx={{
                              width: 50,
                              height: 50,
                              border: "3px solid #6841f3",
                           }}
                        />{" "}
                        <div>
                           <p>Welcome Back</p>{" "}
                           <h3 className="text-lg font-bold">
                              {user.firstName}
                           </h3>
                        </div>
                     </div>
                     <hr />
                     <button className="flex items-center cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100">
                        <span>Settings</span>
                     </button>
                     <button className="flex items-center cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100">
                        <span>My Profile</span>
                     </button>
                     <button className="flex items-center cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100">
                        <span>My Orders</span>
                     </button>
                     <button
                        onClick={handleLogout}
                        className="flex justify-center cursor-pointer mt-2 items-center rounded-xl w-full bg-[#ff0000] text-white text-left px-4 py-2 hover:bg-[#3a305a]">
                        <span className="text-center">Log Out</span>
                     </button>
                  </div>
               ) : (
                  <div className="p-5">
                     <div className="flex items-center gap-2 mb-2 ">
                        <p>Welcome to</p>{" "}
                        <h3 className="text-lg font-bold">BookNet</h3>
                     </div>
                     <hr />

                     <button
                        onClick={() => {
                           navigate("/login");
                           setOpen(false);
                        }}
                        className="cursor-pointer flex justify-center mt-5 rounded-xl items-center w-full bg-[#dda408] text-white text-left px-4 py-2 hover:bg-[#3a305a]">
                        <span className="text-center">Login</span>
                     </button>
                     <button
                        onClick={() => {
                           navigate("/register");
                           setOpen(false);
                        }}
                        className="flex cursor-pointer justify-center mt-5 rounded-xl items-center w-full bg-[#062196] text-white text-left px-4 py-2 hover:bg-[#3a305a]">
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
