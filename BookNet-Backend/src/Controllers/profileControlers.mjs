import { errorCreate } from "../Utils/error-creator.mjs";
import { matchedData, validationResult } from "express-validator";
import DB from "../db/db.mjs";

class ProfileControlers {
   //Create or Update UserProfile------------------------------------------------------------------------------------------------------------------------------

   createOrUpdateUserProfile = async (req, res) => {
      const { id } = req.params;

      if (!id) {
         return res.status(400).json({ message: "User ID is required." });
      }

      const error = validationResult(req);
      const creatingError = errorCreate(error.array());
      if (error.array().length) {
         return res.status(400).json({
            msg: "Validation error",
            error: creatingError,
            data: null,
         });
      }

      const {
         image,
         dob,
         gender,
         designation,
         mobile,
         address,
      } = matchedData(req);


      try {
         const user = await DB.user.findUnique({
            where: { id },
         });

         if (!user) {
            return res
               .status(404)
               .json({ message: `User with ID ${id} not found.` });
         }
         const profile = await DB.profile.upsert({
            where: {
               userId: id,
            },
            // `update` object for when the profile exists
            update: {
               image,
               dob: dob ? new Date(dob) : undefined,
               gender,
               designation,
               mobile,
               address,
            },
            // `create` object for when the profile does NOT exist
            create: {
               User: {
                  connect: { id },
               },
               image,
               dob: dob ? new Date(dob) : undefined,
               gender,
               designation,
               mobile,
               address,
            },
         });

         res.status(200).json({
            message: "Profile saved successfully!",
            profile: profile,
         });
      } catch (error) {
         console.log(error);

         return res.status(500).json({
            msg: "error",
            error: "Internal Server Error",
         });
      }
   };
}

export default new ProfileControlers();
