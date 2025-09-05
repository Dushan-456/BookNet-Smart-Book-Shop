import jwt from "jsonwebtoken";
import DB from "../db/db.mjs";

// Middleware to check if the user is logged in--------------------------------------------------------------------------

export const loginProtect = async (req, res, next) => {
   try {
      // Get token from header or cookie
      const authHeader = req.headers.authorization;

      const token =
         authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : req.cookies?.jwt;

      // If no token found
      if (!token) {
         return res.status(401).json({
            msg: "error",
            error: "Sorry Access Denied. No token provided or No Cookies found.",
            data: null,
         });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the database and attach it to the request object
      // Exclude the password from the user object
      req.authUser = await DB.user.findUnique({
         where: { id: decoded.userId },
         select: {
            id: true,
            email: true,
            username: true,
            role: true,
         },
      });

      if (!req.authUser) {
         return res
            .status(401)
            .json({ message: "Not authorized, user not found" });
      }

      next();
   } catch (err) {
      return res
         .status(401)
         .json({ message: "Not authorized, token Invalid or Expied" });
   }
};

// Middleware to check if the user is an admin-------------------------------------------------------------

export const protectedToAdmin = (req, res, next) => {
   if (req.authUser && req.authUser.role === "ADMIN") {
      next();
   } else {
      res.status(403).json({ message: "Not authorized as an admin" });
   }
};

// This middleware ATTACHES the user if authenticated, but DOES NOT block guests-----------------------------------------------------------------

export const attachUserIfAuthenticated = async (req, res, next) => {
   const authHeader = req.headers.authorization;
      try {
         const token =
            authHeader && authHeader.startsWith("Bearer ")
               ? authHeader.split(" ")[1]
               : req.cookies?.jwt;
               
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.authUser = await DB.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, email: true, username: true, role: true },
         });
      } catch (error) {
         // Invalid token, just ignore and treat as guest
         console.log("Invalid token found, proceeding as guest.");
      }
   
   next();
};
