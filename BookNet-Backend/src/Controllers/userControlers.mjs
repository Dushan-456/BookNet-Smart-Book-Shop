import mongoose from "mongoose";
import UserModel from "../Models/UserModel.mjs";
import { errorCreate } from "../Utils/error-creator.mjs";
import { matchedData, validationResult } from "express-validator";

class UserController {
   // Create new user------------------------------------------------------------------------------------------------------------------------------
   createNewUser = async (req, res) => {
      const error = validationResult(req);
      const creatingError = errorCreate(error.array());
      if (error.array().length) {
         return res.status(400).json({
            msg: "error",
            error: creatingError,
            data: null,
         });
      }

      const {
         first_name,
         last_name,
         dob,
         gender,
         designation,
         mobile,
         gmail,
         age,
         fb_profile,
         address,
      } = matchedData(req);

      const profilePicture = req.file?.filename || null;

      try {
         const newUser = await UserModel.create({
            first_name,
            last_name,
            dob,
            gender,
            designation,
            mobile,
            gmail,
            age,
            fb_profile,
            address,
            profilePicture,
         });
         return res.status(201).json({
            msg: "User Created Successfull",
            data: newUser,
         });
      } catch (error) {
         console.log(error);

         if (error.code === 11000) {
            return res.status(409).json({
               msg: "error",
               error: "This Email Already registerd",
               data: null,
            });
         }
         return res.status(500).json({
            msg: "error",
            error: "Internal Server Error",
         });
      }
   };

   //Get All Users------------------------------------------------------------------------------------------------------------------------------
   showAllUsers = async (req, res) => {
      try {
         const users = await UserModel.find();
         return res.status(200).json({
            msg: "All Users",
            data: users,
         });
      } catch (error) {
         return res.status(500).json({
            msg: "error",
            error: "Internal Server Error",
         });
      }
   };

   //Update Users------------------------------------------------------------------------------------------------------------------------------

   updateUser = async (req, res) => {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({
            msg: "error",
            error: "Invalid user ID",
            data: null,
         });
      }

      const errors = validationResult(req);
      const updatingError = errorCreate(errors.array());

      if (!errors.isEmpty()) {
         return res.status(400).json({
            msg: "error",
            error: updatingError,
            data: null,
         });
      }

      const updatedData = matchedData(req);

      // If a new profile picture is uploaded, save its filename
      if (req.file) {
         updatedData.profilePicture = req.file.filename;
      }

      try {
         const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            updatedData,
            {
               new: true,
               runValidators: true,
            }
         );

         if (!updatedUser) {
            return res.status(404).json({
               msg: "error",
               error: "User not found",
               data: null,
            });
         }

         return res.status(200).json({
            msg: "User updated successfully",
            data: updatedUser,
         });
      } catch (error) {
         console.error(error);
         return res.status(500).json({
            msg: "error",
            error: "Internal Server Error",
         });
      }
   };

   //Get  Users by ID------------------------------------------------------------------------------------------------------------------------------

   getUserById = async (req, res) => {
      const id = req.params.id;

      if (id && id !== "") {
         if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
               msg: "error",
               error: "Invalid ID format",
               data: null,
            });
         }

         try {
            const user = await UserModel.findById(id);
            if (user !== null) {
               return res.status(200).json({
                  msg: "user data",
                  data: user,
               });
            }

            return res.status(404).json({
               msg: "error",
               error: "User not found",
               data: null,
            });
         } catch (error) {
            return res.status(500).json({
               msg: "error",
               error: "Internal Server Error",
            });
         }
      } else {
         return res.status(400).json({
            msg: "error",
            error: "Missing ID",
            data: null,
         });
      }
   };

   
   //Delete  Users by ID------------------------------------------------------------------------------------------------------------------------------

   deleteUser = async (req, res) => {
      const { id } = req.params;

      // Check if ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({
            msg: "error",
            error: "Invalid user ID format",
            data: null,
         });
      }

      try {
         const deletedUser = await UserModel.findByIdAndDelete(id);

         if (!deletedUser) {
            return res.status(404).json({
               msg: "error",
               error: "User not found",
               data: null,
            });
         }

         return res.status(200).json({
            msg: "User deleted successfully",
            data: deletedUser,
         });
      } catch (error) {
         console.error("Delete error:", error);
         return res.status(500).json({
            msg: "error",
            error: "Internal server error",
            data: null,
         });
      }
   };
}

export default new UserController();
