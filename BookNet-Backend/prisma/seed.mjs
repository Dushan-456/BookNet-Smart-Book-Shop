// prisma/seed.js
import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // --- 1. CLEAN UP existing data ---
  // The order of deletion matters to avoid foreign key constraint errors
  console.log('Cleaning up database...');
  await prisma.orderItem.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.serviceOrder.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
  console.log('Database cleaned.');

  // --- 2. CREATE Users ---
  console.log('Creating users...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const adminUser = await prisma.user.create({
    data: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@booknet.com',
      username: 'admin',
      passwordHash: hashedPassword,
      role: 'ADMIN',
    },
  });

  const customerUser = await prisma.user.create({
    data: {
      firstName: 'Customer',
      lastName: 'User',
      email: 'customer@booknet.com',
      username: 'customer',
      passwordHash: hashedPassword,
      role: 'CUSTOMER',
    },
  });

  const deliveryUser = await prisma.user.create({
    data: {
      firstName: 'Delivery',
      lastName: 'Person',
      email: 'delivery@booknet.com',
      username: 'delivery',
      passwordHash: hashedPassword,
      role: 'DELIVERY',
    },
  });
  console.log(`Created users: ${adminUser.username}, ${customerUser.username}, ${deliveryUser.username}`);

  // --- 3. CREATE Categories ---
  console.log('Creating categories...');
  const booksCategory = await prisma.category.create({
    data: { name: 'Books' },
  });

  const fictionCategory = await prisma.category.create({
    data: {
      name: 'Fiction',
      parentId: booksCategory.id,
    },
  });

  const stationeryCategory = await prisma.category.create({
    data: { name: 'Stationery' },
  });
  console.log('Categories created.');

  // --- 4. CREATE Products ---
  console.log('Creating products...');
  await prisma.product.createMany({
    data: [
      // Books
      {
        title: 'The Midnight Library',
        description: 'A novel about all the choices that go into a life well lived.',
        price: 15.99,
        type: 'BOOK',
        stock: 50,
        sku: 'B001',
        isDigital: false,
        categoryId: fictionCategory.id,
      },
      {
        title: 'Project Hail Mary',
        description: 'A lone astronaut must save the earth from disaster.',
        price: 18.50,
        type: 'BOOK',
        stock: 30,
        sku: 'B002',
        isDigital: false,
        categoryId: fictionCategory.id,
      },
      // E-Book
      {
        title: 'Prisma an E-Book',
        description: 'A digital guide to mastering Prisma ORM.',
        price: 9.99,
        type: 'EBOOK',
        stock: 9999, // Digital products have "infinite" stock
        sku: 'E001',
        isDigital: true,
        downloadUrl: '/downloads/prisma-guide.pdf',
        categoryId: booksCategory.id,
      },
      // Stationery
      {
        title: 'Classic Notebook',
        description: 'A5 ruled notebook, 200 pages.',
        price: 5.00,
        type: 'STATIONERY',
        stock: 150,
        sku: 'S001',
        isDigital: false,
        categoryId: stationeryCategory.id,
      },
    ],
  });
  console.log('Products created.');

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });