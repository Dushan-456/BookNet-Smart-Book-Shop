import { errorCreate } from "../Utils/error-creator.mjs";
import { matchedData, validationResult } from "express-validator";
import DB from "../db/db.mjs";

class OrderControllers {
   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Create a new order from the user's cart
 * @route          POST /api/v1/orders
 * @access         Authenticated User
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   createOrder = async (req, res) => {
      const userId = req.authUser.id;

      const error = validationResult(req);
      const creatingError = errorCreate(error.array());
      if (error.array().length) {
         return res.status(400).json({
            msg: "Valiation error",
            error: creatingError,
            data: null,
         });
      }
      const {
         shippingName,
         shippingPhone,
         shippingLine1,
         shippingLine2,
         shippingCity,
         shippingPostal,
      } = matchedData(req);

      try {
         // 1. Find the user's cart and its items
         const cart = await DB.cart.findUnique({
            where: { userId },
            include: {
               items: {
                  include: { product: true },
               },
            },
         });

         if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty." });
         }

         // 2. Calculate the total price on the backend
         const total = cart.items.reduce((acc, item) => {
            return acc + item.quantity * item.product.price;
         }, 0);

         // 3. Use a transaction to ensure all operations succeed or fail together
         const newOrder = await DB.$transaction(async (tx) => {
            // 3a. Create the Order
            const order = await tx.order.create({
               data: {
                  userId,
                  total,
                  shippingName,
                  shippingPhone,
                  shippingLine1,
                  shippingLine2,
                  shippingCity,
                  shippingPostal,
                  // Payment status will default to PENDING
               },
            });

            // 3b. Create OrderItems from CartItems
            const orderItemsData = cart.items.map((item) => ({
               orderId: order.id,
               productId: item.productId,
               quantity: item.quantity,
               unitPrice: item.product.price,
            }));

            await tx.orderItem.createMany({
               data: orderItemsData,
            });

            // 3c. Update stock for each product
            for (const item of cart.items) {
               await tx.product.update({
                  where: { id: item.productId },
                  data: { stock: { decrement: item.quantity } },
               });
            }

            // 3d. Delete the cart items and the cart itself
            await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
            await tx.cart.delete({ where: { id: cart.id } });

            await tx.delivery.create({
               data: {
                  orderId: order.id,
                  status: "PENDING",
                  trackingCode: `BN-${Date.now()}`, // Simple unique tracking code
               },
            });

            return order; // Return the created order from the transaction
         });

         // 4. Respond with the new order
         res.status(201).json({
            message: "Order placed successfully!",
            order: newOrder,
         });
      } catch (error) {
         console.error("Error creating order:", error);
         res.status(500).json({ message: "Server error while placing order." });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Get all orders for a specific user
 * @route          GET /api/v1/orders/my-orders/:userId
 * @access         Authenticated User
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   getAllOrdersByUserId = async (req, res) => {
      const requestedUserId = req.params.userId;
      const loggedInUser = req.authUser; // From 'protect' middleware

      try {
         // --- AUTHORIZATION CHECK ---
         if (
            loggedInUser.id !== requestedUserId &&
            loggedInUser.role !== "ADMIN"
         ) {
            return res.status(403).json({
               message: "Access denied. You can only view your own orders.",
            });
         }

         const orders = await DB.order.findMany({
            where: {
               userId: requestedUserId,
            },
            include: {
               items: {
                  include: {
                     product: {
                        select: {
                           id: true,
                           title: true,
                        },
                     },
                  },
               },
            },
            orderBy: {
               createdAt: "desc", // Show the most recent orders first
            },
         });

         if (!orders) {
            return res
               .status(404)
               .json({ message: "No orders found for this user." });
         }

         res.status(200).json(orders);
      } catch (error) {
         console.error("Error fetching user orders:", error);
         res.status(500).json({
            message: "Server error while fetching orders.",
         });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Get all orders (for admins)
 * @route          GET /api/v1/orders/
 * @access         Admin
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   getAllOrders = async (req, res) => {
      try {
         const orders = await DB.order.findMany({
            include: {
               user: {
                  // Include user details for context
                  select: {
                     id: true,
                     firstName: true,
                     lastName: true,
                     email: true,
                  },
               },
            },
            orderBy: {
               createdAt: "desc",
            },
         });
         res.status(200).json(orders);
      } catch (error) {
         console.error("Error fetching all orders:", error);
         res.status(500).json({ message: "Server error" });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Get a single order by order ID (for admins)
 * @route          GET /api/v1/orders/:id
 * @access         Admin
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   getOrderByOrderId = async (req, res) => {
      const { id } = req.params;
      try {
         const order = await DB.order.findUnique({
            where: { id },
            include: {
               user: {
                  select: {
                     id: true,
                     firstName: true,
                     lastName: true,
                     email: true,
                  },
               },
               items: {
                  include: {
                     product: true, // Include full product details for each item
                  },
               },
               delivery: {
                  select: {
                     id: true,
                     trackingCode: true,
                     status: true,
                     assignedStaffId: true,
                  },
               },
            },
         });

         if (!order) {
            return res.status(404).json({ message: "Order not found" });
         }

         res.status(200).json(order);
      } catch (error) {
         console.error("Error fetching order by ID:", error);
         res.status(500).json({ message: "Server error" });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Update an order's status (for admins)
 * @route          PUT /api/v1/orders/:id/status
 * @access         Admin
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   updateOrderStatus = async (req, res) => {
      const { id } = req.params;
      const { status } = req.body; // e.g., "PROCESSING", "DISPATCHED", "DELIVERED"

      // Optional: Validate that the status is a valid OrderStatus enum value
      if (
         ![
            "PENDING",
            "PROCESSING",
            "DISPATCHED",
            "DELIVERED",
            "CANCELLED",
         ].includes(status)
      ) {
         return res.status(400).json({ message: "Invalid order status" });
      }

      try {
         const updatedOrder = await DB.order.update({
            where: { id },
            data: {
               status: status,
            },
         });
         res.status(200).json({
            message: "Order status Updated",
            updatedOrder,
         });
      } catch (error) {
         if (error.code === "P2025") {
            return res
               .status(404)
               .json({ message: `Order with ID ${id} not found.` });
         }
         console.error("Error updating order status:", error);
         res.status(500).json({ message: "Server error" });
      }
   };
}

export default new OrderControllers();
