import { Router } from "express";
import categoryController from "../Controllers/categoryControllers.mjs";
import { loginProtect, protectedToAdmin } from "../middleware/authMiddleware.mjs";
import { CategoryFieldsValidator } from "../middleware/validationMethods.mjs";

const categoryRouter = Router();

// --- PUBLIC ROUTES ---

categoryRouter.get("/", categoryController.getAllCategories);


// // --- ADMIN-ONLY ROUTES (Require Authentication & Authorization) ---

categoryRouter.post("/", loginProtect,protectedToAdmin,CategoryFieldsValidator(),categoryController.createCategory);
categoryRouter.put("/:id", loginProtect,protectedToAdmin,CategoryFieldsValidator(),categoryController.updateCategory);
categoryRouter.delete("/:id", loginProtect,protectedToAdmin,categoryController.deleteCategory);

export default categoryRouter;
