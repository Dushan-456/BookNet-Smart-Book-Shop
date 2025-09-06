import DB from "../db/db.mjs";
import { ServiceStatus, ServiceType } from '../generated/prisma/index.js'; // Import enums


class ServiceControllers {
/**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Create a new service order as an AUTHENTICATED user
 * @route          POST /api/v1/services/user
 * @access         Authenticated User
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
createAuthenticatedServiceOrder = async (req, res) => {
    const userId = req.authUser.id; 
    const { type, details } = req.body;

    if (!req.file) {
        return res
            .status(400)
            .json({ message: "A file is required for this service." });
    }

    try {
        const fileUrl = `${req.protocol}://${req.get(
            "host"
        )}/${req.file.path.replace(/\\/g, "/")}`;

        // --- Use a transaction to create both records safely ---
        const newServiceOrder = await DB.$transaction(async (tx) => {
            // 1. Create the ServiceOrder first to get its ID
            const serviceOrder = await tx.serviceOrder.create({
                data: {
                    userId: userId,
                    type,
                    details,
                    fileUrl: fileUrl,
                },
            });

            // 2. Create the corresponding Delivery record using the new ID
            await tx.delivery.create({
                data: {
                    serviceOrderId: serviceOrder.id, 
                    status: 'PENDING',
                    trackingCode: `BNS-${Date.now()}` 
                }
            });

            // 3. Return the serviceOrder so it can be sent in the response
            return serviceOrder;
        });

        res.status(201).json({
            message: "Service order submitted successfully!",
            order: newServiceOrder,
        });

    } catch (error) {
        console.error("Error creating authenticated service order:", error);
        res.status(500).json({ message: "Server error." });
    }
};

/**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Create a new service order as a GUEST (in-shop)
 * @route          POST /api/v1/services/guest
 * @access         Public
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   createGuestServiceOrder = async (req, res) => {
      // Get guest details from the request body
      const { guestName, guestContact, type, details } = req.body;

      // Basic validation for the guest flow
      if (!guestName || !guestContact) {
         return res.status(400).json({
            message: "Full name and contact information are required.",
         });
      }
      if (!req.file) {
         return res
            .status(400)
            .json({ message: "A file is required for this service." });
      }

      try {
         const fileUrl = `${req.protocol}://${req.get(
            "host"
         )}/${req.file.path.replace(/\\/g, "/")}`;

         const newServiceOrder = await DB.serviceOrder.create({
            data: {
               guestName: guestName,
               guestContact: guestContact,
               type,
               details,
               fileUrl: fileUrl,
            },
         });
         res.status(201).json({
            message: "Your file has been submitted successfully!",
            orderId: newServiceOrder.id, // Give them a reference ID
         });
      } catch (error) {
         console.error("Error creating guest service order:", error);
         res.status(500).json({ message: "Server error." });
      }
   };

/**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Get all service orders (for admins) with filtering
 * @route          GET /api/v1/services/
 * @access         Admin
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   getAllServiceOrders = async (req, res) => {
      const { status, type } = req.query; // e.g., ?status=IN_PROGRESS

      try {
         const where = {};
         // If a status is provided in the query, add it to the filter
         // --- VALIDATION  ---
         if (status) {
            if (!Object.values(ServiceStatus).includes(status)) {
               return res.status(400).json({ message: "Invalid status value" });
            }
            where.status = status;
         }

         if (type) {
            if (!Object.values(ServiceType).includes(type)) {
               return res.status(400).json({ message: "Invalid type value" });
            }
            where.type = type;
         }

         const serviceOrders = await DB.serviceOrder.findMany({
            where,
            include: {
               // Include who placed the order (either the registered user or guest name)
               user: {
                  select: {
                     id: true,
                     firstName: true,
                     lastName: true,
                     email: true,
                  },
               },
               // Include who the order is assigned to
               assignedStaff: {
                  select: {
                     id: true,
                     firstName: true,
                     lastName: true,
                  },
               },
            },
            orderBy: {
               createdAt: "desc", // Show the latest orders first
            },
         });
         res.status(200).json(serviceOrders);
      } catch (error) {
         console.error("Error fetching service orders:", error);
         res.status(500).json({ message: "Server error" });
      }
   };



/**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Get a single service order by ID (for admins) 
 * @route          GET /api/v1/services/:id
 * @access         Private (Admin or order owner)
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 getServiceOrderById = async (req, res) => {
  const { id } = req.params;
  const loggedInUser = req.authuser;

  try {
    const serviceOrder = await DB.serviceOrder.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, firstName: true, email: true } },
        assignedStaff: { select: { id: true, firstName: true } },
      },
    });

    if (!serviceOrder) {
      return res.status(404).json({ message: 'Service order not found' });
    }

    // --- AUTHORIZATION CHECK ---
    // Allow access if user is an admin OR if they are the owner of the order
    if (loggedInUser.role !== 'ADMIN' && serviceOrder.userId !== loggedInUser.id) {
        return res.status(403).json({ message: 'Access denied.' });
    }

    res.status(200).json(serviceOrder);
  } catch (error) {
    console.error('Error fetching service order by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


/**------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @description    Update a service order's status and/or assign staff
 * @route          GET /api/v1/services/:id
 * @access         Private/Admin
 ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 updateServiceOrder = async (req, res) => {
    const { id } = req.params;
    const { status, assignedStaffId } = req.body;

    try {
        const dataToUpdate = {};
        if (status) {
            dataToUpdate.status = status;
        }
        if (assignedStaffId) {
            // Optional: Verify the assignedStaffId corresponds to a valid staff member
            const staffMember = await DB.user.findUnique({ where: { id: assignedStaffId }});
            if (!staffMember || (staffMember.role !== 'ADMIN' && staffMember.role !== 'DELIVERY')) {
                return res.status(400).json({ message: 'Invalid staff member ID.'});
            }
            dataToUpdate.assignedStaffId = assignedStaffId;
        }

        if (Object.keys(dataToUpdate).length === 0) {
            return res.status(400).json({ message: 'No update data provided.'});
        }

        const updatedServiceOrder = await DB.serviceOrder.update({
            where: { id },
            data: dataToUpdate,
        });
        res.status(200).json(updatedServiceOrder);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: `Service order with ID ${id} not found.` });
        }
        console.error('Error updating service order:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


}

export default new ServiceControllers();
