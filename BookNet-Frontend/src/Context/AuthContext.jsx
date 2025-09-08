import React, { createContext, useState, useContext } from "react";
import API from "../API/api";

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
   // Initialize state from localStorage to check for an existing session
   const [user, setUser] = useState(() => {
      try {
         const storedUser = localStorage.getItem("user");
         return storedUser ? JSON.parse(storedUser) : null;
      } catch (error) {
         console.error("Failed to parse user from localStorage", error);
         return null;
      }
   });

   /**
    * login function: Updates the user state and stores it in localStorage.
    * @param {object} userData - The user object received from the API.
    */
   const login = (userData) => {
      // Store user data in both component state and browser's localStorage
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
   };

   /**
    * logout function: Clears the user state, localStorage, and the server-side cookie.
    */
   const logout = async () => {
      try {
         // Call the backend endpoint to clear the HttpOnly cookie
         await API.post("/users/logout");
      } catch (error) {
         console.error("Logout failed:", error);
         // Even if the server call fails, proceed to clear client-side data
      } finally {
         // Clear user data from component state and localStorage
         setUser(null);
         localStorage.removeItem("user");
      }
   };

   // The value object contains the state and functions to be shared
   const value = {
      user,
      isAuthenticated: !!user, // A handy boolean to check if a user is logged in
      login,
      logout,
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create a custom hook for easy access to the context
export const useAuth = () => {
   const context = useContext(AuthContext);
   if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
   }
   return context;
};
