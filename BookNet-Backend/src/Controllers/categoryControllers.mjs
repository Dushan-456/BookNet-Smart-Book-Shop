import { errorCreate } from "../Utils/error-creator.mjs";
import { matchedData, validationResult } from "express-validator";
import DB from "../db/db.mjs";

class CategoryController {
   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Get All Categories
 * @route          GET /api/v1/categories/
 * @access         Public
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   getAllCategories = async (req, res) => {
      try {
         const categories = await DB.category.findMany();

         res.status(200).json(categories);
      } catch (error) {
         console.error("Error fetching categories:", error);
         res.status(500).json({ message: "Internal Server error" });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Get a Single Category by ID
 * @route          GET /api/v1/categories/:id
 * @access         Public
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   getCategoryById = async (req, res) => {
      const { id } = req.params;
      try {
         const category = await DB.category.findUnique({
            where: { id },
         });

         if (!category) {
            return res
               .status(404)
               .json({ message: `Category with ID ${id} not found.` });
         }
         res.status(200).json(category);
      } catch (error) {
         console.error(`Error fetching category with ID ${id}:`, error);
         res.status(500).json({ message: "Internal Server error" });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Create New Category
 * @route          POST /api/v1/categories/
 * @access         Admin
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   createCategory = async (req, res) => {
      const error = validationResult(req);
      const creatingError = errorCreate(error.array());
      if (error.array().length) {
         return res.status(400).json({
            msg: "Validation error",
            error: creatingError,
            data: null,
         });
      }

      let { name, image } = matchedData(req);

      try {
         const newCategory = await DB.category.create({
            data: {
               name,
               image,
            },
         });
         res.status(201).json(newCategory);
      } catch (error) {
         console.error("Error creating category:", error);
         if (error.code === "P2002" && error.meta?.target?.includes("name")) {
            return res
               .status(409)
               .json({
                  message: `Category with name '${name}' already exists.`,
               });
         }
         res.status(500).json({ message: "Internal Server error" });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Update Category
 * @route          PUT /api/v1/categories/:id
 * @access         Admin
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   updateCategory = async (req, res) => {
      const { id } = req.params;

      const error = validationResult(req);
      const creatingError = errorCreate(error.array());
      if (error.array().length) {
         return res.status(400).json({
            msg: "Validation error",
            error: creatingError,
            data: null,
         });
      }

      let { name, image } = matchedData(req);

      try {
         const updatedCategory = await DB.category.update({
            where: { id },
            data: {
               name,
               image,
            },
         });
         res.status(200).json(updatedCategory);
      } catch (error) {
         if (error.code === "P2025") {
            return res
               .status(404)
               .json({ message: `Category with ID ${id} not found.` });
         }
         if (error.code === "P2002" && error.meta?.target?.includes("name")) {
            return res
               .status(409)
               .json({
                  message: `Category with name '${name}' already exists.`,
               });
         }
         console.error("Error updating category:", error);
         res.status(500).json({ message: "Internal Server error" });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Delete Category
 * @route          DELETE /api/v1/categories/:id
 * @access         Admin
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   deleteCategory = async (req, res) => {
      const { id } = req.params;

      try {
         const existingCategory = await DB.category.findUnique({
            where: { id },
         });
         if (!existingCategory) {
            return res
               .status(404)
               .json({ message: `Category with ID ${id} not found.` });
         }

         await DB.category.delete({
            where: { id },
         });

         res.status(200).json({ message: "Category deleted successfully." });
      } catch (error) {
         if (error.code === "P2025") {
            return res
               .status(404)
               .json({ message: `Category with ID ${id} not found.` });
         }
         console.error("Error deleting category:", error);
         res.status(500).json({ message: "Internal Server error" });
      }
   };
}

export default new CategoryController();
