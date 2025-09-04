import { errorCreate } from "../Utils/error-creator.mjs";
import { matchedData, validationResult } from "express-validator";
import DB from "../db/db.mjs";

class CategoryController {
   //Create New Category------------------------------------------------------------------------------------------------------------------------------

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

      let { name, parentId } = matchedData(req);

      // Handle empty string case: if parentId is an empty string, treat it as null
      if (parentId === "") {
         parentId = null;
      }

      try {
         if (parentId) {
            const parentCategory = await DB.category.findUnique({
               where: { id: parentId },
            });

            if (!parentCategory) {
               return res
                  .status(400)
                  .json({ message: "Parent category not found." });
            }
         }

         const newCategory = await DB.category.create({
            data: {
               name,
               parentId,
            },
         });
         res.status(201).json(newCategory);
      } catch (error) {
         console.error("Error creating category:", error);
         res.status(500).json({ message: "Internal Server error" });
      }
   };

   //Get All Category------------------------------------------------------------------------------------------------------------------------------

   getAllCategories = async (req, res) => {
      try {
         const categories = await DB.category.findMany();

         // Helper function to build the tree structure
         const buildCategoryTree = (list) => {
            const map = {};
            const roots = [];

            list.forEach((cat, i) => {
               map[cat.id] = i; // Use map to look up the array index of each category
               list[i].children = []; // Initialize children array
            });

            list.forEach((cat) => {
               if (cat.parentId !== null) {
                  // If it's a child, push it to its parent's children array
                  if (list[map[cat.parentId]]) {
                     list[map[cat.parentId]].children.push(cat);
                  }
               } else {
                  // If it's a root node (no parent), push it to the roots array
                  roots.push(cat);
               }
            });
            return roots;
         };

         const categoryTree = buildCategoryTree(categories);
         res.status(200).json(categoryTree);
      } catch (error) {
         console.error("Error fetching categories:", error);
         res.status(500).json({ message: "Internal Server error" });
      }
   };

   //Update Category------------------------------------------------------------------------------------------------------------------------------

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

      let { name, parentId } = matchedData(req);
      // Handle empty string case: if parentId is an empty string, treat it as null
      if (parentId === "") {
         parentId = null;
      }

      try {
         if (parentId) {
            const parentCategory = await DB.category.findUnique({
               where: { id: parentId },
            });

            if (!parentCategory) {
               return res
                  .status(400)
                  .json({ message: "Parent category not found." });
            }
         }
         const updatedCategory = await DB.category.update({
            where: { id },
            data: {
               name,
               parentId,
            },
         });
         res.status(200).json(updatedCategory);
      } catch (error) {
         if (error.code === "P2025") {
            return res
               .status(404)
               .json({ message: `Category with ID ${id} not found.` });
         }
         console.error("Error updating category:", error);
         res.status(500).json({ message: "Internal Server error" });
      }
   };

   //Delete Category------------------------------------------------------------------------------------------------------------------------------

   deleteCategory = async (req, res) => {
      const { id } = req.params;

      try {
         // Safety Check: Prevent deletion if the category has children
         const childCount = await DB.category.count({
            where: { parentId: id },
         });

         if (childCount > 0) {
            return res.status(400).json({
               message:
                  "Cannot delete category because it has child categories. Please delete or reassign children first.",
            });
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
