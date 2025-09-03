import { Router } from "express";
import userRouter from "./userRouter.mjs";


const rootRouter = Router();

rootRouter.get("/",(req,res)=> res.sendStatus(200));

rootRouter.use("/users",userRouter)




export default rootRouter ;