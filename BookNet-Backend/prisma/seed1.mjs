import { PrismaClient } from "../src/generated/prisma/index.js"; // Adjust path if needed
const prisma = new PrismaClient();

async function main() {
  // Example categories (make sure they exist in your DB before running this)
  const fictionCategory = await prisma.category.upsert({
    where: { name: "Fiction" },
    update: {},
    create: { name: "Fiction" },
  });

  const nonFictionCategory = await prisma.category.upsert({
    where: { name: "Non-Fiction" },
    update: {},
    create: { name: "Non-Fiction" },
  });

  const stationeryCategory = await prisma.category.upsert({
    where: { name: "Stationery" },
    update: {},
    create: { name: "Stationery" },
  });

  // Helper to create products
  async function createProduct({
    sku,
    title,
    description,
    price,
    salePrice,
    type,
    stock,
    isDigital,
    categoryId,
    primaryImageText,
  }) {
    return await prisma.product.upsert({
      where: { sku },
      update: {},
      create: {
        title,
        description,
        price,
        salePrice,
        type,
        stock,
        sku,
        isDigital,
        categoryId,
        images: {
          create: [
            {
              url: `https://picsum.photos/seed/${sku}-1/600/400`,
              altText: `${primaryImageText} Cover`,
              isPrimary: true,
            },
            {
              url: `https://picsum.photos/seed/${sku}-2/400/300`,
              altText: `${primaryImageText} Sample Page`,
            },
          ],
        },
      },
    });
  }

  // Generate 70 products
  const productsData = [
    // 25 Fiction Books
    ...Array.from({ length: 25 }).map((_, i) => ({
      sku: `BOOK${String(i + 1).padStart(3, "0")}`,
      title: `Fictional Story ${i + 1}`,
      description: `An engaging fictional tale number ${i + 1}.`,
      price: 20 + i,
      salePrice: i % 3 === 0 ? 18 + i : null,
      type: "BOOK",
      stock: 100 - i,
      isDigital: false,
      categoryId: fictionCategory.id,
      primaryImageText: `Fiction Book ${i + 1}`,
    })),

    // 20 Non-Fiction Books
    ...Array.from({ length: 20 }).map((_, i) => ({
      sku: `NFBOOK${String(i + 1).padStart(3, "0")}`,
      title: `Non-Fiction Title ${i + 1}`,
      description: `A detailed non-fictional reference book number ${i + 1}.`,
      price: 30 + i,
      salePrice: i % 2 === 0 ? 28 + i : null,
      type: "BOOK",
      stock: 80,
      isDigital: false,
      categoryId: nonFictionCategory.id,
      primaryImageText: `Non-Fiction Book ${i + 1}`,
    })),

    // 15 E-Books
    ...Array.from({ length: 15 }).map((_, i) => ({
      sku: `EBOOK${String(i + 1).padStart(3, "0")}`,
      title: `E-Book Title ${i + 1}`,
      description: `Digital edition of e-book ${i + 1}.`,
      price: 15 + i,
      salePrice: i % 4 === 0 ? 12 + i : null,
      type: "EBOOK",
      stock: 999, // unlimited
      isDigital: true,
      categoryId: fictionCategory.id,
      primaryImageText: `E-Book ${i + 1}`,
    })),

    // 10 Stationery Items
    ...Array.from({ length: 10 }).map((_, i) => ({
      sku: `STAT${String(i + 1).padStart(3, "0")}`,
      title: `Stationery Item ${i + 1}`,
      description: `High-quality stationery product number ${i + 1}.`,
      price: 5 + i,
      salePrice: i % 2 === 0 ? 4 + i : null,
      type: "STATIONERY",
      stock: 200,
      isDigital: false,
      categoryId: stationeryCategory.id,
      primaryImageText: `Stationery ${i + 1}`,
    })),
  ];

  for (const p of productsData) {
    await createProduct(p);
  }

  console.log("✅ Seeded 70 products successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
