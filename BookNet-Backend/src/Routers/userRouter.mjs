import { Router } from "express";
import userControlers from "../Controllers/userControlers.mjs";
import profileControlers from "../Controllers/profileControlers.mjs";
import {
   loginValidator,
   ProfileFieldsValidator,
   RegisterValidator,
} from "../middleware/validationMethods.mjs";
import { loginProtect, protectedToAdmin } from "../middleware/authMiddleware.mjs";

const userRouter = Router();

// --- PUBLIC ROUTES ---

userRouter.post("/register",RegisterValidator(), userControlers.RegisterNewUser);
userRouter.post("/login", loginValidator(), userControlers.loginUser);


// --- PROTECTED ROUTES (Require Authentication) ---

userRouter.post("/:id",ProfileFieldsValidator(),loginProtect,profileControlers.createOrUpdateUserProfile);
userRouter.get("/:id", loginProtect, userControlers.getUserAndProfileById);


// --- ADMIN-ONLY ROUTES (Require Authentication & Authorization) ---

userRouter.get("/",loginProtect,protectedToAdmin, userControlers.showAllUsers);
userRouter.delete("/:id", loginProtect,protectedToAdmin, userControlers.deleteUserById);

export default userRouter;
