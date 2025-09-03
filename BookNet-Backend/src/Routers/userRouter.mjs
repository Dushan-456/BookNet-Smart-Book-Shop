import { Router } from "express";
import userControlers from "../Controllers/userControlers.mjs";
import profileControlers from "../Controllers/profileControlers.mjs";
import {
   loginValidator,
   ProfileFieldsValidator,
   RegisterValidator,
} from "../middleware/validationMethods.mjs";
import authMiddleware from "../middleware/authMiddleware.mjs";

const userRouter = Router();

// --- PUBLIC ROUTES ---

userRouter.post("/register",RegisterValidator(), userControlers.RegisterNewUser);
userRouter.post("/login", loginValidator(), userControlers.loginUser);


// --- PROTECTED ROUTES (Require Authentication) ---

userRouter.post("/:id",ProfileFieldsValidator(),authMiddleware,profileControlers.createOrUpdateUserProfile);
userRouter.get("/:id", authMiddleware, userControlers.getUserAndProfileById);


// --- ADMIN-ONLY ROUTES (Require Authentication & Authorization) ---

userRouter.get("/",authMiddleware, userControlers.showAllUsers);
userRouter.delete("/:id", authMiddleware, userControlers.deleteUserById);

export default userRouter;
