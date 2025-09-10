// prisma/seed.js
import { PrismaClient } from "../src/generated/prisma/index.js"; // Adjust path if needed
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  const passwordHash = await bcrypt.hash("password123", 10);

  // --- 1. Create Users ---
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      username: "adminuser",
      passwordHash: passwordHash,
      role: "ADMIN",
      Profile: {
        create: {
          image:
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
          dob: new Date("1985-01-15"),
          gender: "Male",
          designation: "System Administrator",
          mobile: "0771234567",
          address: "Admin Street, Admin City",
        },
      },
    },
  });

  const customerUser = await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      firstName: "Customer",
      lastName: "User",
      email: "customer@example.com",
      username: "customeruser",
      passwordHash: passwordHash,
      role: "CUSTOMER",
      Profile: {
        create: {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s",
          dob: new Date("1990-05-20"),
          gender: "Female",
          mobile: "0719876543",
          address: "Customer Lane, Customer Town",
        },
      },
    },
  });

  const deliveryUser = await prisma.user.upsert({
    where: { email: "delivery@example.com" },
    update: {},
    create: {
      firstName: "Delivery",
      lastName: "Person",
      email: "delivery@example.com",
      username: "deliveryperson",
      passwordHash: passwordHash,
      role: "DELIVERY",
      Profile: {
        create: {
          image:
            "https://media.istockphoto.com/id/1208361629/photo/cheerful-casual-man-laughing-and-looking-forward.jpg?s=612x612&w=0&k=20&c=KX6ChmB09ZBCHU-btYwSbLNb3M8fKJM9Lfg0AWECQtE=",
          dob: new Date("1992-11-01"),
          gender: "Male",
          mobile: "0754433221",
          address: "Delivery Road, Logistics Hub",
        },
      },
    },
  });

  console.log({ adminUser, customerUser, deliveryUser });

  // --- 2. Create Categories ---
  const booksCategory = await prisma.category.upsert({
    where: { name: "Books" },
    update: {},
    create: {
      name: "Books",
      image: "https://via.placeholder.com/150/ADD8E6/000000?text=Books",
    },
  });

  const fictionCategory = await prisma.category.upsert({
    where: { name: "Fiction" },
    update: {},
    create: {
      name: "Fiction",
      image: "https://via.placeholder.com/150/ADD8E6/000000?text=Fiction",
      parentId: booksCategory.id,
    },
  });

  const stationeryCategory = await prisma.category.upsert({
    where: { name: "Stationery" },
    update: {},
    create: {
      name: "Stationery",
      image: "https://via.placeholder.com/150/90EE90/000000?text=Stationery",
    },
  });

  const electronicsCategory = await prisma.category.upsert({
    where: { name: "Electronics" },
    update: {},
    create: {
      name: "Electronics",
      image: "https://via.placeholder.com/150/FFD700/000000?text=Electronics",
    },
  });

  console.log({
    booksCategory,
    fictionCategory,
    stationeryCategory,
    electronicsCategory,
  });

  // --- 3. Create Products ---
  const product1 = await prisma.product.upsert({
    where: { sku: "BOOK001" },
    update: {},
    create: {
      title: "The Great Adventure",
      description: "A thrilling tale of exploration and discovery.",
      price: 25.0,
      salePrice: 20.0, // Discounted
      type: "BOOK",
      stock: 100,
      sku: "BOOK001",
      isDigital: false,
      categoryId: fictionCategory.id,
      images: {
        create: [
          {
            url: "https://via.placeholder.com/600x400/87CEEB/FFFFFF?text=Book+Cover+1",
            altText: "Book Cover 1",
            isPrimary: true,
          },
          {
            url: "https://via.placeholder.com/400x300/87CEEB/FFFFFF?text=Book+Page+1",
            altText: "Book Page 1",
          },
        ],
      },
    },
  });

  const product2 = await prisma.product.upsert({
    where: { sku: "EBOOK001" },
    update: {},
    create: {
      title: "Learn JavaScript in 24 Hours",
      description: "A comprehensive guide for beginners.",
      price: 15.0,
      type: "EBOOK",
      stock: 999, // Digital products often have high stock
      sku: "EBOOK001",
      isDigital: true,
      downloadUrl: "http://example.com/js_ebook.pdf",
      categoryId: booksCategory.id,
      images: {
        create: [
          {
            url: "https://via.placeholder.com/600x400/98FB98/000000?text=EBook+Cover",
            altText: "Ebook Cover",
            isPrimary: true,
          },
        ],
      },
    },
  });

  const product3 = await prisma.product.upsert({
    where: { sku: "PEN001" },
    update: {},
    create: {
      title: "Premium Gel Pen Set",
      description: "Smooth writing gel pens in various colors.",
      price: 12.5,
      type: "STATIONERY",
      stock: 50,
      sku: "PEN001",
      isDigital: false,
      categoryId: stationeryCategory.id,
      images: {
        create: [
          {
            url: "https://via.placeholder.com/600x400/FFC0CB/000000?text=Pen+Set",
            altText: "Pen Set",
            isPrimary: true,
          },
        ],
      },
    },
  });

  const product4 = await prisma.product.upsert({
    where: { sku: "WBP002" },
    update: {},
    create: {
      title: "Water Bottle - Pink",
      description: "Stylish and durable water bottle, 750ml.",
      price: 18.0,
      salePrice: 15.0,
      type: "STATIONERY",
      stock: 30,
      sku: "WBP002",
      isDigital: false,
      categoryId: stationeryCategory.id,
      images: {
        create: [
          {
            url: "https://via.placeholder.com/600x400/FFB6C1/000000?text=Water+Bottle",
            altText: "Pink Water Bottle",
            isPrimary: true,
          },
          {
            url: "https://via.placeholder.com/400x300/FFB6C1/000000?text=Bottle+Detail",
            altText: "Water Bottle Detail",
          },
        ],
      },
    },
  });

  const product5 = await prisma.product.upsert({
    where: { sku: "HEADPHONE01" },
    update: {},
    create: {
      title: "Wireless Bluetooth Headphones",
      description: "High-fidelity sound with comfortable earcups.",
      price: 99.99,
      type: "STATIONERY", // Assuming electronics are PHYSICAL
      stock: 25,
      sku: "HEADPHONE01",
      isDigital: false,
      categoryId: electronicsCategory.id,
      images: {
        create: [
          {
            url: "https://via.placeholder.com/600x400/D3D3D3/000000?text=Headphones",
            altText: "Bluetooth Headphones",
            isPrimary: true,
          },
        ],
      },
    },
  });

  console.log({ product1, product2, product3, product4, product5 });


  // --- 5. Create Carts & CartItems ---
  const customerCart = await prisma.cart.upsert({
    where: { userId: customerUser.id },
    update: {},
    create: {
      userId: customerUser.id,
      items: {
        create: [
          {
            productId: product1.id,
            quantity: 1,
            unitPrice: product1.salePrice || product1.price,
          },
          { productId: product3.id, quantity: 2, unitPrice: product3.price },
        ],
      },
    },
  });
  console.log({ customerCart });

  // --- 6. Create Orders & OrderItems ---
  const customerOrder = await prisma.order.upsert({
    where: { id: "order_cust_001" }, // Dummy ID for upsert
    update: {},
    create: {
      id: "order_cust_001",
      userId: customerUser.id,
      status: "PROCESSING",
      paymentStatus: "PAID",
      total: 45.0, // 20.00 (product1) + 2 * 12.50 (product3) = 45.00
      paymentProvider: "Stripe",
      paymentIntentId: "pi_dummy_001",
      shippingName: "Customer User",
      shippingPhone: "0719876543",
      shippingLine1: "123 Main Street",
      shippingCity: "Customer Town",
      shippingPostal: "10000",
      items: {
        create: [
          {
            productId: product1.id,
            quantity: 1,
            unitPrice: product1.salePrice || product1.price,
          },
          { productId: product3.id, quantity: 2, unitPrice: product3.price },
        ],
      },
    },
  });
  console.log({ customerOrder });

  // --- 7. Create Service Orders ---
  const serviceOrder = await prisma.serviceOrder.upsert({
    where: { id: "service_order_001" },
    update: {},
    create: {
      id: "service_order_001",
      userId: customerUser.id,
      type: "PRINTING",
      details: {
        pages: 50,
        color: true,
        doubleSided: true,
      },
      fileUrl: "http://example.com/document.pdf",
      status: "IN_PROGRESS",
      price: 15.75,
      assignedStaffId: deliveryUser.id, // Assign to delivery person as an example
    },
  });
  console.log({ serviceOrder });

  // --- 8. Create Deliveries ---
  const orderDelivery = await prisma.delivery.upsert({
    where: { orderId: customerOrder.id },
    update: {},
    create: {
      trackingCode: "TRK-ORDER-001",
      status: "ASSIGNED",
      orderId: customerOrder.id,
      assignedStaffId: deliveryUser.id,
    },
  });

  const serviceDelivery = await prisma.delivery.upsert({
    where: { serviceOrderId: serviceOrder.id },
    update: {},
    create: {
      trackingCode: "TRK-SERVICE-001",
      status: "PENDING",
      serviceOrderId: serviceOrder.id,
      assignedStaffId: deliveryUser.id,
    },
  });
  console.log({ orderDelivery, serviceDelivery });

  // --- 9. Create Payments ---
  const orderPayment = await prisma.payment.upsert({
    where: { orderId: customerOrder.id },
    update: {},
    create: {
      amount: customerOrder.total,
      provider: "Stripe",
      status: "PAID",
      transactionId: "txn_order_001",
      orderId: customerOrder.id,
    },
  });

  const servicePayment = await prisma.payment.upsert({
    where: { serviceOrderId: serviceOrder.id },
    update: {},
    create: {
      amount: serviceOrder.price,
      provider: "PayPal",
      status: "PAID",
      transactionId: "txn_service_001",
      serviceOrderId: serviceOrder.id,
    },
  });
  console.log({ orderPayment, servicePayment });

  console.log("Seeding finished.");
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
