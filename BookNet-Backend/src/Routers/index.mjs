import { Router } from "express";
import userRouter from "./userRouter.mjs";


const rootRouter = Router();

rootRouter.get("/",(req,res)=> res.sendStatus(200));

rootRouter.use("/user",userRouter)




export default rootRouter ;