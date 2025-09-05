import { Router } from "express";
import { attachUserIfAuthenticated } from "../middleware/authMiddleware.mjs";
import cartController from "../Controllers/cartControllers.mjs";
import { identifyCart } from "../middleware/cartMiddleware.mjs";

const cartRouter = Router();

// --- PUBLIC ROUTES ---

cartRouter.get("/",attachUserIfAuthenticated,identifyCart, cartController.getCart);

cartRouter.post("/items",attachUserIfAuthenticated,identifyCart, cartController.addItemToCart);

cartRouter.put("/items/:itemId",attachUserIfAuthenticated,identifyCart, cartController.updateCartItem);

cartRouter.delete("/items/:itemId",attachUserIfAuthenticated,identifyCart, cartController.removeCartItem);


export default cartRouter;
