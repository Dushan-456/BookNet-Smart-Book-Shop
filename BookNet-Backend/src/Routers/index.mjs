import { Router } from "express";
import userRouter from "./userRouter.mjs";
import categoryRouter from "./categoryRouter.mjs";
import productRouter from "./productRouter.mjs";
import cartRouter from "./cartRouter.mjs";
import orderRoutes from "./orderRoutes.mjs";
import serviceRoutes from "./serviceRoutes.mjs";
import deliveryRoutes from "./deliveryRoutes.mjs";


const rootRouter = Router();

rootRouter.get("/",(req,res)=> res.sendStatus(200));

rootRouter.use("/users",userRouter)

rootRouter.use("/categories",categoryRouter)

rootRouter.use("/products",productRouter)

rootRouter.use("/cart",cartRouter)

rootRouter.use("/orders",orderRoutes)

rootRouter.use("/services",serviceRoutes)

rootRouter.use("/deliveries",deliveryRoutes)




export default rootRouter ;