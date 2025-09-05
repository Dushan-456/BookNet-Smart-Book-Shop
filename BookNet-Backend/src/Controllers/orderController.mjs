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
 * @route          GET /api/orders/my-orders/:userId
 * @access         Authenticated User
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  
   getOrdersByUserId = async (req, res) => {
  const requestedUserId = req.params.userId;
  const loggedInUser = req.authUser; // From 'protect' middleware

  try {
    // --- AUTHORIZATION CHECK ---
    // A user can only access their own orders, unless they are an admin.
    if (loggedInUser.id !== requestedUserId && loggedInUser.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied. You can only view your own orders.' });
    }

    // --- FETCH ORDERS ---
    const orders = await DB.order.findMany({
      where: {
        userId: requestedUserId,
      },
      // Include the details of the items in each order
      include: {
        items: {
          include: {
            product: {
              select: { // Select only what you need to show in the order history
                id: true,
                title: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Show the most recent orders first
      },
    });

    if (!orders) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    res.status(200).json(orders);

  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Server error while fetching orders.' });
  }
};

}

export default new OrderControllers();
