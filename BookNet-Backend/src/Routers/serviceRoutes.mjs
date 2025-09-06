import { Router } from "express";
import { loginProtect, protectedToAdmin } from "../middleware/authMiddleware.mjs";
import upload from "../middleware/uploadMiddleware.mjs";
import serviceControllers from "../Controllers/serviceControllers.mjs";

const serviceRoutes = Router();

// // --- PUBLIC ROUTES (GUEST/IN-SHOP USERS)---

serviceRoutes.post("/guest",upload, serviceControllers.createGuestServiceOrder);

// // --- PROTECTED ROUTES (Require Authentication) ---

serviceRoutes.post("/user",loginProtect,upload, serviceControllers.createAuthenticatedServiceOrder);


// // --- ADMIN-ONLY ROUTES (Require Authentication & Authorization) ---

serviceRoutes.get("/",loginProtect,protectedToAdmin, serviceControllers.getAllServiceOrders);
serviceRoutes.get("/:id",loginProtect, serviceControllers.getServiceOrderById);
serviceRoutes.put("/:id",loginProtect,protectedToAdmin, serviceControllers.updateServiceOrder);

export default serviceRoutes;
