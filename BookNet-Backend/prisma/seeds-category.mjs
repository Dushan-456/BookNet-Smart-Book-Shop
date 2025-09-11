import { PrismaClient } from "../src/generated/prisma/index.js"; // Adjust path if needed
const prisma = new PrismaClient();

async function main() {
  const categories = [
    {
      name: "Books",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
    },
    {
      name: "eBooks",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80",
    },
    {
      name: "Stationery",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    },
    {
      name: "Notebooks",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
    },
    {
      name: "Pens & Pencils",
      image:
        "https://images.unsplash.com/photo-1588776814546-56f49f40d7b8?w=800&q=80",
    },
    {
      name: "Art Supplies",
      image:
        "https://images.unsplash.com/photo-1580894908361-967195033215?w=800&q=80",
    },
    {
      name: "Magazines",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80",
    },
    {
      name: "Educational eBooks",
      image:
        "https://images.unsplash.com/photo-1553729784-e91953dec042?w=800&q=80",
    },
    {
      name: "Children’s Books",
      image:
        "https://images.unsplash.com/photo-1526318472351-bc6c2ebd2a88?w=800&q=80",
    },
    {
      name: "Office Supplies",
      image:
        "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=800&q=80",
    },

    {
      name: "Fiction",
      image:
        "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80",
    },
    {
      name: "Non-Fiction",
      image:
        "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=800&q=80",
    },
    {
      name: "Science & Technology",
      image:
        "https://images.unsplash.com/photo-1581090700227-4c4e6c3bcd5c?w=800&q=80",
    },
    {
      name: "History",
      image:
        "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80",
    },
    {
      name: "Comics & Graphic Novels",
      image:
        "https://images.unsplash.com/photo-1587735243615-c89cae4dc85b?w=800&q=80",
    },
    {
      name: "Romance",
      image:
        "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80",
    },
    {
      name: "Thrillers & Mystery",
      image:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    },
    {
      name: "Fantasy",
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80",
    },
    {
      name: "Health & Fitness",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    },
    {
      name: "Cookbooks",
      image:
        "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=800&q=80",
    },
    {
      name: "Travel Guides",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    },
    {
      name: "Diaries & Journals",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    },
    {
      name: "Markers & Highlighters",
      image:
        "https://images.unsplash.com/photo-1581320549231-d02d273a4cdc?w=800&q=80",
    },
    {
      name: "Calendars & Planners",
      image:
        "https://images.unsplash.com/photo-1609921141832-67f22fc5267d?w=800&q=80",
    },
    {
      name: "Craft Supplies",
      image:
        "https://images.unsplash.com/photo-1598618448954-13aeb9b30a2f?w=800&q=80",
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log("✅ 25 Categories seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
