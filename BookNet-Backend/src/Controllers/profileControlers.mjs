import { errorCreate } from "../Utils/error-creator.mjs";
import { matchedData, validationResult } from "express-validator";
import DB from "../db/db.mjs";



class ProfileControlers {


    //Create or Update UserProfile------------------------------------------------------------------------------------------------------------------------------

    createOrUpdateUserProfile = async (req, res) => {
        const { id } = req.params;
        const userId = parseInt(id);

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
            Image,
            FirstName,
            LastName,
            DOB,
            Gender,
            Designation,
            Mobile,
            Address,
        } = matchedData(req);
        console.log(Image)

        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid User ID provided.' });
        }

        try {
            //  Verify that the user actually exists
            const user = await DB.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                return res.status(404).json({ message: `User with ID ${userId} not found.` });
            }
            const profile = await DB.profile.upsert({
                where: {
                    UserId: userId,
                },
                // `update` object for when the profile exists
                update: {
                    Image,
                    FirstName,
                    LastName,
                    DOB: DOB ? new Date(DOB) : undefined,
                    Gender,
                    Designation,
                    Mobile,
                    Address,
                },
                // `create` object for when the profile does NOT exist
                create: {
                    User: {
                        connect: { id: userId },
                    },
                    Image,
                    FirstName,
                    LastName,
                    DOB: DOB ? new Date(DOB) : undefined,
                    Gender,
                    Designation,
                    Mobile,
                    Address,
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
