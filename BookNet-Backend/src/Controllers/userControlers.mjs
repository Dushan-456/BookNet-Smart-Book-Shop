import { errorCreate } from "../Utils/error-creator.mjs";
import { matchedData, validationResult } from "express-validator";
import DB from "../db/db.mjs";
import bcrypt from "bcrypt";

class UserController {
   // Create new user------------------------------------------------------------------------------------------------------------------------------
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
      try {
         // 3. Hash the password
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);

         // 4. Create a new user in the database
         const newUser = await DB.user.create({
            data: {
               firstName,
               lastName,
               username,
               email,
               passwordHash: hashedPassword,
            },
         });

         // 5. Respond with the created user (omitting the password)
         const { passwordHash: _, ...userWithoutPassword } = newUser;
         res.status(201).json({
            message: "User created successfully!",
            user: userWithoutPassword,
         });
      } catch (error) {
         console.error("Error Registering user:", error);

         if (error.code === "P2002") {
            const field = error.meta.target[0]; // e.g., 'Username' or 'Email'
            return res
               .status(409)
               .json({ message: `${field} is already taken.` });
         }

         res.status(500).json({ message: "An unexpected error occurred." });
      }
   };

   //Get All Users------------------------------------------------------------------------------------------------------------------------------
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

   //DeleteUser by ID------------------------------------------------------------------------------------------------------------------------------
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

   //Get User Profile Details by ID------------------------------------------------------------------------------------------------------------------------------

   getUserAndProfileById = async (req, res) => {
      const { id } = req.params;
      if (!id) {
         return res.status(400).json({ message: "User ID is required." });
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
