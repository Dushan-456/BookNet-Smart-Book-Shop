import { errorCreate } from "../Utils/error-creator.mjs";
import { matchedData, validationResult } from "express-validator";
import DB from "../db/db.mjs";

class ProductController {
   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Get All Product
 * @route          GET /api/v1/products/
 * @access         Public
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   getAllProducts = async (req, res) => {
      const {
         category,
         type,
         sortBy = "createdAt",
         sortOrder = "desc",
         page = 1,
         limit = 10,
      } = req.query;

      try {
         const pageNum = parseInt(page);
         const limitNum = parseInt(limit);
         const skip = (pageNum - 1) * limitNum;

         // Build filter conditions dynamically
         const where = {};
         if (category) where.categoryId = category;
         if (type) where.type = type;

         // Get total count for pagination metadata
         const totalProducts = await DB.product.count({ where });

         const products = await DB.product.findMany({
            where,
            skip,
            take: limitNum,
            orderBy: [{ [sortBy]: sortOrder }, { id: "asc" }],
            include: {
               category: {
                  select: { name: true },
               },
               images: {
                  select: { url: true, isPrimary: true },
               },
            },
         });

         res.status(200).json({
            message: "Products retrieved successfully!",
            data: products,
            pagination: {
               totalProducts,
               totalPages: Math.ceil(totalProducts / limitNum),
               currentPage: pageNum,
            },
         });
      } catch (error) {
         console.error("Error fetching products:", error);
         res.status(500).json({ message: "Internal Server error" });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Get  Product by ID
 * @route          GET /api/v1/products/:id
 * @access         Public
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   getProductById = async (req, res) => {
      const { id } = req.params;
      try {
         const product = await DB.product.findUnique({
            where: { id },
            include: {
               category: true,
            },
         });

         if (!product) {
            return res.status(404).json({ message: "Product not found" });
         }

         res.status(200).json(product);
      } catch (error) {
         console.error("Error fetching product:", error);
         res.status(500).json({ message: "Server error" });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Create/Add New Product
 * @route          POST /api/v1/products/
 * @access         Admin
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   createProduct = async (req, res) => {
      const error = validationResult(req);
      const creatingError = errorCreate(error.array());
      if (error.array().length) {
         return res.status(400).json({
            msg: "Validation error",
            error: creatingError,
            data: null,
         });
      }

      let {
         title,
         description,
         price,
         type,
         stock,
         sku,
         isDigital,
         downloadUrl,
         categoryId,
      } = matchedData(req);

      // onvert types before validation ---
      const stockNumber = stock ? parseInt(stock, 10) : 0;
      const priceDecimal = price ? parseFloat(price) : 0.0;
      const isDigitalBool = isDigital === "true"; // Converts "true" to true, everything else to false

      // Handle optional categoryId being an empty string
      if (categoryId === "") {
         categoryId = null;
      }

      try {
         //  Check if the category exists before creating the product
         if (categoryId) {
            const categoryExists = await DB.category.findUnique({
               where: { id: categoryId },
            });
            if (!categoryExists) {
               return res.status(400).json({ message: "Category not found" });
            }
         }

         const newProduct = await DB.product.create({
            data: {
               title,
               description,
               price: priceDecimal,
               type,
               stock: stockNumber,
               sku,
               isDigital: isDigitalBool,
               downloadUrl,
               categoryId,
            },
         });
         res.status(201).json({ message: "Product Created", newProduct });
      } catch (error) {
         if (error.code === "P2002") {
            // Handles unique constraint violation for 'sku'
            return res.status(409).json({ message: "SKU already exists." });
         }
         console.error("Error creating product:", error);
         res.status(500).json({ message: "Internal Server error" });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Update Product by ID
 * @route          PUT /api/v1/products/:id
 * @access         Admin
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   updateProduct = async (req, res) => {
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

      const { ...dataToUpdate } = matchedData(req);

      try {
         if (dataToUpdate.stock) {
            dataToUpdate.stock = parseInt(dataToUpdate.stock, 10);
         }
         if (dataToUpdate.price) {
            dataToUpdate.price = parseFloat(dataToUpdate.price);
         }
         if (dataToUpdate.isDigital) {
            dataToUpdate.isDigital = dataToUpdate.isDigital === "true";
         }
         const updatedProduct = await DB.product.update({
            where: { id },
            data: dataToUpdate,
         });
         res.status(200).json({ message: "Product Updated", updatedProduct });
      } catch (error) {
         if (error.code === "P2025") {
            return res
               .status(404)
               .json({ message: `Product with ID ${id} not found.` });
         }
         if (error.code === "P2002") {
            return res.status(409).json({ message: "SKU already exists." });
         }
         console.error("Error updating product:", error);
         res.status(500).json({ message: "Internal Server error" });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Delete Product by ID
 * @route          DELETE /api/v1/products/:id
 * @access         Admin
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   deleteProduct = async (req, res) => {
      const { id } = req.params;
      try {
         await DB.product.delete({
            where: { id },
         });
         res.status(200).json({ message: "Product deleted successfully." });
      } catch (error) {
         if (error.code === "P2025") {
            return res
               .status(404)
               .json({ message: `Product with ID ${id} not found.` });
         }
         // This error happens if you try to delete a product that is part of an order
         if (error.code === "P2003") {
            return res.status(409).json({
               message:
                  "Cannot delete product as it is part of existing orders.",
            });
         }
         console.error("Error deleting product:", error);
         res.status(500).json({ message: "Server error" });
      }
   };
}

export default new ProductController();
