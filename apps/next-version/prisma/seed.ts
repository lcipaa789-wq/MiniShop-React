// prisma/seed.ts
// Seeds the database with initial product data.
// Run with: npx prisma db seed
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  // Delete all existing products before seeding to avoid duplicates
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  // Insert mock products — same data that was in ProductGrid.tsx
  await prisma.product.createMany({
    data: [
      {
        title: "Wireless Headphones",
        description:
          "Premium sound quality with active noise cancellation and 30h battery life.",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        price: 99.99,
        oldPrice: 149.99,
        discount: 33,
        rating: 4.9,
        reviews: 301,
        category: "ELECTRONICS",
      },
      {
        title: "Mechanical Keyboard",
        description:
          "Compact TKL layout with RGB backlight and tactile blue switches.",
        image:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
        price: 129.0,
        oldPrice: 189.0,
        discount: 31,
        rating: 4.8,
        reviews: 9481,
        category: "ELECTRONICS",
      },
      {
        title: "Minimal Desk Lamp",
        description:
          "Touch-controlled LED lamp with 3 brightness levels and USB charging port.",
        image:
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
        price: 49.99,
        oldPrice: 69.99,
        discount: 28,
        rating: 4.7,
        reviews: 480,
        category: "HOME",
      },
      {
        title: "Leather Wallet",
        description:
          "Slim genuine leather bifold wallet with RFID blocking technology.",
        image:
          "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
        price: 39.0,
        oldPrice: 55.0,
        discount: 29,
        rating: 4.8,
        reviews: 148,
        category: "CLOTHING",
      },
      {
        title: "Running Sneakers",
        description:
          "Lightweight mesh upper with responsive foam sole for everyday running.",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        price: 89.99,
        oldPrice: 129.99,
        discount: 30,
        rating: 4.9,
        reviews: 382,
        category: "SPORTS",
      },
      {
        title: "Ceramic Coffee Mug",
        description:
          "Handmade 12oz mug with matte finish. Dishwasher and microwave safe.",
        image:
          "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400",
        price: 24.0,
        oldPrice: 34.0,
        discount: 29,
        rating: 4.8,
        reviews: 185129,
        category: "HOME",
      },
      {
        title: "Face Moisturizer",
        description:
          "Hydrating daily moisturizer with SPF 30. Suitable for all skin types.",
        image:
          "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
        price: 34.99,
        oldPrice: 49.99,
        discount: 30,
        rating: 4.6,
        reviews: 2341,
        category: "BEAUTY",
      },
      {
        title: "Yoga Mat",
        description:
          "Non-slip 6mm thick yoga mat with carrying strap. Eco-friendly material.",
        image:
          "https://images.unsplash.com/photo-1601925228088-e3b06d06c1d7?w=400",
        price: 44.99,
        oldPrice: 59.99,
        discount: 25,
        rating: 4.7,
        reviews: 876,
        category: "SPORTS",
      },
      {
        title: "Linen Shirt",
        description:
          "Breathable linen shirt with a relaxed fit. Perfect for warm weather.",
        image:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
        price: 59.99,
        oldPrice: 79.99,
        discount: 25,
        rating: 4.5,
        reviews: 543,
        category: "CLOTHING",
      },
    ],
  });

  console.log(" Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
