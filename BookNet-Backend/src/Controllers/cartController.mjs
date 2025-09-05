import DB from "../db/db.mjs";

class CartControllers {


// Helper to get the correct 'where' clause for finding a cart
 getCartWhereClause = (req) => {
  return req.authUser ? { userId: req.authUser.id } : { guestId: req.cartId };
};

/**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Get the user's or guest's cart
 * @route          GET /api/v1/cart
 * @access         Public
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 getCart = async (req, res) => {
  const where = getCartWhereClause(req);
  try {
    const cart = await DB.cart.findUnique({
      where,
      include: {
        items: {
          include: {
            product: true, 
          },
        },
      },
    });

    if (!cart) {
      return res.status(200).json(null); // Return null or an empty cart structure
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Add an item to the cart, or update quantity if it exists
 * @route          POST /api/cart/items
 * @access         Public
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const where = getCartWhereClause(req);

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Product ID and a valid quantity are required.' });
  }

  try {
    const product = await DB.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const updatedCart = await DB.$transaction(async (tx) => {
      // 1. Find or create the cart
      let cart = await tx.cart.findUnique({ where });
      if (!cart) {
        cart = await tx.cart.create({ data: where });
      }

      // 2. Check if item already exists in the cart
      const existingItem = await tx.cartItem.findFirst({
        where: { cartId: cart.id, productId: productId },
      });

      if (existingItem) {
        // 3a. If it exists, update the quantity
        await tx.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
        });
      } else {
        // 3b. If it's a new item, create it
        await tx.cartItem.create({
          data: {
            cartId: cart.id,
            productId: productId,
            quantity: quantity,
            unitPrice: product.price,
          },
        });
      }

      // 4. Return the fully updated cart
      return tx.cart.findUnique({
        where: { id: cart.id },
        include: { items: { include: { product: true } } },
      });
    });

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


/**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Update an item's quantity in the cart
 * @route          PUT /api/cart/items/:itemId
 * @access         Public
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/

 updateCartItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  const where = getCartWhereClause(req);

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: 'A valid quantity is required.' });
  }

  try {
    // Security check: ensure the item belongs to the user's/guest's cart
    const cart = await DB.cart.findUnique({ where });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const itemInCart = await DB.cartItem.findFirst({ where: { id: itemId, cartId: cart.id } });
    if (!itemInCart) {
        return res.status(404).json({ message: 'Item not found in your cart.' });
    }

    // Update the item
    await DB.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    const updatedCart = await DB.cart.findUnique({ where, include: { items: { include: { product: true } } }});
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



/**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Remove an item from the cart
 * @route          DELETE /api/cart/items/:itemId
 * @access         Public
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  removeCartItem = async (req, res) => {
  const { itemId } = req.params;
  const where = getCartWhereClause(req);

  try {
     // Security check: ensure the item belongs to the user's/guest's cart
    const cart = await DB.cart.findUnique({ where });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }
    
    const itemInCart = await DB.cartItem.findFirst({ where: { id: itemId, cartId: cart.id } });
    if (!itemInCart) {
        return res.status(404).json({ message: 'Item not found in your cart.' });
    }
    
    // Delete the item
    await DB.cartItem.delete({
      where: { id: itemId },
    });

    const updatedCart = await DB.cart.findUnique({ where, include: { items: { include: { product: true } } }});
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
}
export default new CartControllers();
