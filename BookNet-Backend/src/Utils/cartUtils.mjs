import DB from "../db/db.mjs";

export const mergeCarts = async (userId, guestCartId) => {
   try {
      // 1. Find the guest cart and the user's existing cart (if any)
      const guestCart = await DB.cart.findUnique({
         where: { guestId: guestCartId },
         include: { items: true },
      });

      // If there's no guest cart, there's nothing to merge
      if (!guestCart || guestCart.items.length === 0) {
         return;
      }

      const userCart = await DB.cart.findUnique({
         where: { userId },
         include: { items: true },
      });

      // 2. If the user has no cart, simply assign the guest cart to them
      if (!userCart) {
         await DB.cart.update({
            where: { id: guestCart.id },
            data: { guestId: null, userId: userId },
         });
         console.log("Guest cart assigned to user.");
         return;
      }

      // 3. If both carts exist, merge items from guest cart to user cart
      for (const guestItem of guestCart.items) {
         const existingItem = userCart.items.find(
            (item) => item.productId === guestItem.productId
         );

         if (existingItem) {
            // If item already exists in user's cart, update the quantity
            await DB.cartItem.update({
               where: { id: existingItem.id },
               data: { quantity: existingItem.quantity + guestItem.quantity },
            });
         } else {
            // If item doesn't exist, "move" it by updating its cartId
            await DB.cartItem.update({
               where: { id: guestItem.id },
               data: { cartId: userCart.id },
            });
         }
      }

      // 4. Delete the now-empty guest cart
      await DB.cart.delete({ where: { id: guestCart.id } });
      console.log("Guest cart merged and deleted.");
   } catch (error) {
      console.error("Error merging carts:", error);
   }
};
