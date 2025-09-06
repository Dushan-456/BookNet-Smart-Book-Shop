import DB from "../db/db.mjs";

class DeliveryController {
   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Get all deliveries (for admins) with filtering
 * @route          GET /api/v1/deliveries
 * @access         Admin
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   getAllDeliveries = async (req, res) => {
      const { status } = req.query;
      const where = {};
      if (status) {
         where.status = status;
      }

      try {
         const deliveries = await DB.delivery.findMany({
            where,
            include: {
               order: { select: { id: true, shippingName: true } },
               serviceOrder: {
                  select: { id: true, user: true, guestName: true },
               },
               assignedTo: { select: { id: true, firstName: true } },
            },
            orderBy: { createdAt: "desc" },
         });
         res.status(200).json(deliveries);
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: "Server error" });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Assign a delivery to a staff member
 * @route          PUT /api/v1/deliveries/:id/assign
 * @access         Admin
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   assignDelivery = async (req, res) => {
      const { id } = req.params;
      const { assignedStaffId } = req.body;

      try {
         // Verify the staff member exists and has the DELIVERY role
         const staff = await DB.user.findUnique({
            where: { id: assignedStaffId },
         });
         if (!staff || staff.role !== "DELIVERY") {
            return res
               .status(400)
               .json({ message: "Invalid or unauthorized staff member ID." });
         }

         const updatedDelivery = await DB.delivery.update({
            where: { id },
            data: {
               assignedStaffId,
               status: "ASSIGNED",
            },
         });
         res.status(200).json({
            message: "Delivery Rider Assigned",
            updatedDelivery,
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: "Server error" });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description   Get all deliveries assigned to the logged-in delivery rider
 * @route          GET /api/v1/deliveries/my-tasks
 * @access         Authenticated User and role Delivery
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   getMyAssignedDeliveries = async (req, res) => {
      const staffId = req.authUser.id;
      try {
         const deliveries = await DB.delivery.findMany({
            where: { assignedStaffId: staffId },
            include: {
               order: {
                  select: {
                     id: true,
                     shippingName: true,
                     shippingCity: true,
                  },
               },
               serviceOrder: {
                  select: { id: true, user: true, guestName: true },
               },
            },
            orderBy: { updatedAt: "desc" },
         });
         res.status(200).json(deliveries);
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: "Internal Server error" });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Update the status of an assigned delivery
 * @route          PUT /api/v1/deliveries/:id/status
 * @access         Authenticated User and role Delivery or Admin
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   updateDeliveryStatus = async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
      const loggedInUser = req.authUser;

      if (!status) {
         return res.status(400).json({ message: "A status is required." });
      }

      try {
         const delivery = await DB.delivery.findUnique({
            where: { id },
         });

         if (!delivery) {
            return res.status(404).json({ message: "Delivery not found." });
         }

         // --- AUTHORIZATION LOGIC ---
         // Check if the user is an Admin OR the assigned staff member
         const isAssignedStaff = delivery.assignedStaffId === loggedInUser.id;
         const isAdmin = loggedInUser.role === "ADMIN";

         if (!isAdmin && !isAssignedStaff) {
            return res.status(403).json({
               message:
                  "Forbidden: You are not authorized to update this delivery's status.",
            });
         }

         const updatedDelivery = await DB.delivery.update({
            where: { id },
            data: { status },
         });

         res.status(200).json({
            message: "Delivery status Updated",
            updatedDelivery,
         });
      } catch (error) {
         console.error("Error updating delivery status:", error);
         res.status(500).json({ message: "Server error" });
      }
   };

   /**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Get full details for a single delivery by its ID
 * @route          GET /api/v1/deliveries/:id
 * @access         Arivate (Admin, assigned staff, or order owner)
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/

   getDeliveryById = async (req, res) => {
      const { id } = req.params;
      const loggedInUser = req.authUser; // From 'protect' middleware

      try {
         const delivery = await DB.delivery.findUnique({
            where: { id },
            include: {
               order: {
                  include: {
                     user: {
                        select: { id: true, firstName: true, lastName: true },
                     },
                  },
               },
               // Include the service order details if it exists
               serviceOrder: {
                  include: {
                     user: {
                        select: { id: true, firstName: true, lastName: true },
                     },
                  },
               },
               // Include the assigned delivery staff's details
               assignedTo: {
                  select: {
                     id: true,
                     firstName: true,
                     lastName: true,
                  },
               },
            },
         });

         if (!delivery) {
            return res.status(404).json({ message: "Delivery not found." });
         }

         // --- AUTHORIZATION CHECK ---
         // Allow access if:
         // 1. The logged-in user is an ADMIN.
         // 2. The logged-in user is the staff member assigned to this delivery.
         // 3. The logged-in user is the customer who placed the associated order.
         const isOwner =
            delivery.order?.userId === loggedInUser.id ||
            delivery.serviceOrder?.userId === loggedInUser.id;

         if (
            loggedInUser.role !== "ADMIN" &&
            delivery.assignedStaffId !== loggedInUser.id &&
            !isOwner
         ) {
            return res.status(403).json({
               message:
                  "Access denied. You are not authorized to view these delivery details.",
            });
         }

         res.status(200).json(delivery);
      } catch (error) {
         console.error("Error fetching delivery details:", error);
         res.status(500).json({ message: "Server error." });
      }
   };
}

export default new DeliveryController();
