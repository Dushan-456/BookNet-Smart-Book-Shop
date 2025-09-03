import { Router } from "express";
import userControlers from "../Controllers/userControlers.mjs";
import {  RegisterValidator, userDataValidator } from "../Utils/validationMethods.mjs";

const userRouter = Router();

userRouter.post("/register", RegisterValidator(), userControlers.RegisterNewUser);

userRouter.delete("/delete-user/:id", userControlers.deleteUserById);

userRouter.get("/all-users", userControlers.showAllUsers);

// userRouter.get("/:id", userControlers.getUserById);

export default userRouter;
