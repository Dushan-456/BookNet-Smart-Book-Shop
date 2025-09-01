import { errorCreate } from "../Utils/error-creator.mjs";
import { matchedData, validationResult } from "express-validator";
import DB from "../db/db.mjs";


class UserController {
   // Create new user------------------------------------------------------------------------------------------------------------------------------
   createNewUser = async (req,res)=>{

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
         name,
         user_name,
         password,

      } = matchedData(req);


   }
   
   updateUser = async (req, res) => {
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


      try {
         const newUser = await DB.user.create({
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

         return res.status(500).json({
            msg: "error",
            error: "Internal Server Error",
         });
      }
   };

   //Get All Users------------------------------------------------------------------------------------------------------------------------------
   showAllUsers = async (req, res) => {
      try {
         const users = await DB.user.findMany();
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

}

export default new UserController();
