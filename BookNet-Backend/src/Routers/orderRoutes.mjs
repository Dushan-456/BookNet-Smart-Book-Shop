import { Router } from "express";
import { loginProtect, protectedToAdmin } from "../middleware/authMiddleware.mjs";
import orderController from "../Controllers/orderController.mjs";
import { shippingDetailsFieldsValidator } from "../middleware/validationMethods.mjs";

const orderRoutes = Router();



// // --- PROTECTED ROUTES (Require Authentication) ---

orderRoutes.post("/",loginProtect,shippingDetailsFieldsValidator(),orderController.createOrder);
orderRoutes.get("/my-orders/:userId",loginProtect,orderController.getAllOrdersByUserId);

// --- ADMIN-ONLY ROUTES (Require Authentication & Authorization) ---

orderRoutes.get("/",loginProtect,protectedToAdmin,orderController.getAllOrders);
orderRoutes.get("/:id",loginProtect,protectedToAdmin,orderController.getOrderByOrderId);
orderRoutes.put("/:id/status",loginProtect,protectedToAdmin,orderController.updateOrderStatus);

export default orderRoutes;
