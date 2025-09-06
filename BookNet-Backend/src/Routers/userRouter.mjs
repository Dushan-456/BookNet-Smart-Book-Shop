import { Router } from "express";
import {
   loginValidator,
   ProfileFieldsValidator,
   RegisterValidator,
} from "../middleware/validationMethods.mjs";
import { loginProtect, protectedToAdmin } from "../middleware/authMiddleware.mjs";
import profileControllers from "../Controllers/profileControllers.mjs";
import userControllers from "../Controllers/userControllers.mjs";

const userRouter = Router();

// --- PUBLIC ROUTES ---

userRouter.post("/register",RegisterValidator(), userControllers.RegisterNewUser);
userRouter.post("/login", loginValidator(), userControllers.loginUser);
userRouter.post("/logout", userControllers.logoutUser);


// --- PROTECTED ROUTES (Require Authentication) ---

userRouter.post("/:id",ProfileFieldsValidator(),loginProtect,profileControllers.createOrUpdateUserProfile);
userRouter.get("/my-profile", loginProtect, userControllers.myProfile);


// --- ADMIN-ONLY ROUTES (Require Authentication & Authorization) ---

userRouter.get("/",loginProtect,protectedToAdmin, userControllers.showAllUsers);
userRouter.delete("/:id", loginProtect,protectedToAdmin, userControllers.deleteUserById);
userRouter.get("/:id", loginProtect,protectedToAdmin, userControllers.getUserAndProfileById);

export default userRouter;
