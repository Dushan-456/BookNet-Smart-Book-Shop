import { Router } from "express";
import userControlers from "../Controllers/userControlers.mjs";
import profileControlers from "../Controllers/profileControlers.mjs";
import { ProfileFieldsValidator, RegisterValidator } from "../middleware/validationMethods.mjs";

const userRouter = Router();

userRouter.post("/register", RegisterValidator(), userControlers.RegisterNewUser);

userRouter.delete("/delete/:id", userControlers.deleteUserById);

userRouter.get("/all-users", userControlers.showAllUsers);

userRouter.post("/profile/:id",ProfileFieldsValidator(), profileControlers.createOrUpdateUserProfile);

userRouter.get("/:id",userControlers.getUserAndProfileById);

export default userRouter;
