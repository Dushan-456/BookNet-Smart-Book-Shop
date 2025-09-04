import { Router } from "express";
import userRouter from "./userRouter.mjs";
import categoryRouter from "./categoryRouter.mjs";


const rootRouter = Router();

rootRouter.get("/",(req,res)=> res.sendStatus(200));

rootRouter.use("/users",userRouter)

rootRouter.use("/categories",categoryRouter)




export default rootRouter ;