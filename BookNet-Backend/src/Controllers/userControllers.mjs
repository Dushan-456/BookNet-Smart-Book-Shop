import { errorCreate } from "../Utils/error-creator.mjs";
import { matchedData, validationResult } from "express-validator";
import DB from "../db/db.mjs";
import bcrypt from "bcrypt";
import { generateTokenWithCookies } from "../Utils/jwt.mjs";
import { mergeCarts } from "../Utils/cartUtils.mjs";

class UserController {
   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    New User Registration
 * @route          POST /api/v1/users/register
 * @access         Public
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   RegisterNewUser = async (req, res) => {
      const error = validationResult(req);
      const creatingError = errorCreate(error.array());
      if (error.array().length) {
         return res.status(400).json({
            msg: "Valiation error",
            error: creatingError,
            data: null,
         });
      }

      const { firstName, lastName, username, email, password } =
         matchedData(req);

      const guestCartId = req.cookies.cartToken;

      try {
         // Hash the password
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);

         // Create a new user in the database
         const newUser = await DB.user.create({
            data: {
               firstName,
               lastName,
               username,
               email,
               passwordHash: hashedPassword,
            },
         });

         if (guestCartId) {
            await mergeCarts(newUser.id, guestCartId);
            res.clearCookie("cartToken"); // Clean up the guest cookie after merge
         }
         // Respond with the created user (omitting the password)
         const { passwordHash: _, ...userWithoutPassword } = newUser;

         generateTokenWithCookies(res, newUser.id);

         res.status(201).json({
            message: "User created successfully!",
            user: userWithoutPassword,
         });
      } catch (error) {
         console.error("Error Registering user:", error);

         if (error.code === "P2002") {
            const field = error.meta.target[0]; //  'Username' or 'Email'
            return res
               .status(409)
               .json({ message: `${field} is already taken.` });
         }

         res.status(500).json({ message: "Server error during registration" });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    User Login
 * @route          POST /api/v1/users/login
 * @access         Public
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   loginUser = async (req, res) => {
      const error = validationResult(req);
      const creatingError = errorCreate(error.array());
      if (error.array().length) {
         return res.status(400).json({
            msg: "Valiation error",
            error: creatingError,
            data: null,
         });
      }

      const { emailOrUsername, password } = matchedData(req);
      const guestCartId = req.cookies.cartToken; // Get the guest token from the cookie

      try {
         // Find user by email OR username
         const user = await DB.user.findFirst({
            where: {
               OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
            },
         });

         if (!user) {
            return res
               .status(401)
               .json({ message: "User Name or Email Not Registered in Sytem" });
         }

         //  Compare passwords
         const isMatch = await bcrypt.compare(password, user.passwordHash);

         if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
         }
         if (user && isMatch) {
            // --- MERGE Cart ---
            if (guestCartId) {
               await mergeCarts(user.id, guestCartId);
               res.clearCookie("cartToken"); // Clean up the guest cookie after merge
            }

            //  Generate token and respond
            generateTokenWithCookies(res, user.id);
            res.status(200).json({
               message: "Login Successfull",
               id: user.id,
               username: user.username,
               email: user.email,
            });
         }
      } catch (error) {
         console.error(error);
         res.status(500).json({ message: "Server error during login" });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Logout user / clear cookie
 * @route          POST /api/v1/users/logout
 * @access         Public
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   logoutUser = (req, res) => {
      res.cookie("jwt", "", {
         httpOnly: true,
         expires: new Date(0),
      });
      res.status(200).json({ message: "Logged out successfully" });
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Get All Users
 * @route          GET /api/v1/users/
 * @access         Admin
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   showAllUsers = async (req, res) => {
      try {
         const users = await DB.user.findMany({
            select: {
               id: true,
               username: true,
               firstName: true,
               lastName: true,
               email: true,
               role: true,
               createdAt: true,
               updatedAt: true,

               Profile: {
                  select: {
                     image: true,
                  },
               },
            },
         });
         return res.status(200).json({
            msg: "All Users",
            data: users,
         });
      } catch (error) {
         console.error("Error :", error);

         return res.status(500).json({
            msg: "error",
            error: "Internal Server Error",
         });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    DeleteUser by ID
 * @route          DELETE /api/v1/users/:id
 * @access         Admin
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   deleteUserById = async (req, res) => {
      const { id } = req.params;

      if (!id) {
         return res.status(400).json({ message: "User ID is required." });
      }

      try {
         await DB.user.delete({
            where: {
               id,
            },
         });

         return res.status(200).json({ message: "User deleted successfully." });
      } catch (error) {
         console.error("Error deleting user:", error);
         if (error.code === "P2025") {
            return res
               .status(404)
               .json({ message: `User with ID ${id} not found.` });
         }
         return res.status(500).json({
            msg: "error",
            error: "Internal Server Error",
         });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Get User Profile Details by ID
 * @route          GET /api/v1/users/:id
 * @access         Authenticated User
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   getUserAndProfileById = async (req, res) => {
      const id = req.params.id;
      const loggedInUser = req.authUser; // From 'protect' middleware
      if (!id) {
         return res.status(400).json({ message: "User ID is required." });
      }
      if (loggedInUser.id !== id && loggedInUser.role !== "ADMIN") {
         return res.status(403).json({
            message: "Access denied. You can only view your own profile.",
         });
      }
      try {
         const user = await DB.user.findUnique({
            where: {
               id,
            },
            select: {
               id: true,
               username: true,
               email: true,
               Profile: true,
            },
         });

         if (!user) {
            return res
               .status(404)
               .json({ message: `User with ID ${id} not found.` });
         }

         res.status(200).json({
            message: "User and profile retrieved successfully!",
            data: user,
         });
      } catch (error) {
         console.error("Error fetching user and profile:", error);
         res.status(500).json({ message: "An unexpected error occurred." });
      }
   };
}

export default new UserController();
