import { Router } from "express";
import { loginProtect } from "../middleware/authMiddleware.mjs";
import orderController from "../Controllers/orderController.mjs";
import { shippingDetailsFieldsValidator } from "../middleware/validationMethods.mjs";

const orderRoutes = Router();



// // --- PROTECTED ROUTES (Require Authentication) ---

orderRoutes.post("/",loginProtect,shippingDetailsFieldsValidator(),orderController.createOrder);
orderRoutes.get("/my-orders/:userId",loginProtect,orderController.getOrdersByUserId);

export default orderRoutes;
