import { Router } from "express";
import userControlers from "../Controllers/userControlers.mjs";
import { comValidate, userDataValidator } from "../Utils/validationMethods.mjs";

const userRouter = Router();

userRouter.post("/add-user", comValidate(), userControlers.createNewUser);

// userRouter.delete("/delete-user/:id", userControlers.deleteUser);

// userRouter.get("/all-users", userControlers.showAllUsers);

// userRouter.get("/:id", userControlers.getUserById);

export default userRouter;
