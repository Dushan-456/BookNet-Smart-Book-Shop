import { errorCreate } from "../Utils/error-creator.mjs";
import { matchedData, validationResult } from "express-validator";
import DB from "../db/db.mjs";
import bcrypt from 'bcrypt';



class UserController {
    // Create new user------------------------------------------------------------------------------------------------------------------------------
    RegisterNewUser = async (req, res) => {

        const error = validationResult(req);
        const creatingError = errorCreate(error.array());
        if (error.array().length) {
            return res.status(400).json({
                msg: "error",
                error: creatingError,
                data: null,
            });
        }

        const { Username, Email, Password } = matchedData(req);
        try {
            // 3. Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(Password, salt);

            // 4. Create a new user in the database
            const newUser = await DB.user.create({
                data: {
                    Username,
                    Email,
                    Password: hashedPassword,
                },
            });

            // 5. Respond with the created user (omitting the password)
            const { Password: _, ...userWithoutPassword } = newUser;
            res.status(201).json({
                message: "User created successfully!",
                user: userWithoutPassword
            });

        } catch (error) {
            console.error('Error Registering user:', error);

            if (error.code === 'P2002') {
                const field = error.meta.target[0]; // e.g., 'Username' or 'Email'
                return res.status(409).json({ message: `${field} is already taken.` });
            }

            res.status(500).json({ message: 'An unexpected error occurred.' });
        }



    }

    //Get All Users------------------------------------------------------------------------------------------------------------------------------
    showAllUsers = async (req, res) => {
        try {
            const users = await DB.user.findMany({
            select: {
                id: true,
                Username: true,
                Email: true,
                createAt: true,
                updateAt: true,

                Profile: {
                    select: {
                        Image: true,
                        FirstName: true,
                    },
                },
            },
        });
            return res.status(200).json({
                msg: "All Users",
                data: users,
            });
        } catch (error) {
            console.error('Error :', error);

            return res.status(500).json({
                msg: "error",
                error: "Internal Server Error",
            });
        }
    };

    //Update UserProfile------------------------------------------------------------------------------------------------------------------------------

    updateUserProfile = async (req, res) => {
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

    //Get User Details by ID------------------------------------------------------------------------------------------------------------------------------

    //DeleteUser by ID------------------------------------------------------------------------------------------------------------------------------
    deleteUserById = async (req, res) => {
        const { id } = req.params;
        const userId = parseInt(id);

        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID provided.' });
        }

        try {
            const users = await DB.user.delete({
                where: {
                    id: userId,
                },
            });

            return res.status(200).json({ message: 'User deleted successfully.' });

        } catch (error) {

            console.error('Error deleting user:', error);
            return res.status(500).json({
                msg: "error",
                error: "Internal Server Error",
            });
        }
    };


}

export default new UserController();
