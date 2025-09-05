import { Router } from "express";
import {
   productFieldsValidator,
} from "../middleware/validationMethods.mjs";
import { loginProtect, protectedToAdmin } from "../middleware/authMiddleware.mjs";
import productController from "../Controllers/productControllers.mjs";

const productRouter = Router();

// --- PUBLIC ROUTES ---

productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getProductById);



// // --- ADMIN-ONLY ROUTES (Require Authentication & Authorization) ---

productRouter.post("/", loginProtect,protectedToAdmin,productFieldsValidator(), productController.createProduct);
productRouter.put("/:id", loginProtect,protectedToAdmin,productFieldsValidator(), productController.updateProduct);
productRouter.delete("/:id", loginProtect,protectedToAdmin,productFieldsValidator(), productController.deleteProduct);

export default productRouter;
