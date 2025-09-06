import { Router } from "express";
import { loginProtect, protectedToAdmin, protectedToDelivery } from "../middleware/authMiddleware.mjs";

import deliveryController from "../Controllers/deliveryController.mjs";

const deliveryRoutes = Router();



// // --- PROTECTED ROUTES TO DELIVERY RIDER ---

deliveryRoutes.get("/my-tasks", loginProtect,protectedToDelivery, deliveryController.getMyAssignedDeliveries);

// // --- PROTECTED ROUTES TO (Admin, assigned staff, or order owner)

deliveryRoutes.get("/:id", loginProtect, deliveryController.getDeliveryById);

// // --- PROTECTED ROUTES TO (Admin, assigned staff)

deliveryRoutes.put("/:id/status", loginProtect,protectedToDelivery, deliveryController.updateDeliveryStatus);

// // --- ADMIN-ONLY ROUTES (Require Authentication & Authorization) ---

deliveryRoutes.get("/",loginProtect,protectedToAdmin, deliveryController.getAllDeliveries);
deliveryRoutes.put("/:id/assign",loginProtect,protectedToAdmin, deliveryController.assignDelivery);

export default deliveryRoutes;
