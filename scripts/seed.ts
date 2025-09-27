import { connectToDatabase } from "../src/lib/mongoose.ts";
import { Item } from "../src/models/Item.ts";

const sampleItems = [
  // 🧀 Cheese
  {
    name: "Mozzarella Cheese",
    category: "cheese",
    unit: "kg",
    quantity: 20,
    reorderThreshold: 5,
    costPrice: 80,
    createdBy: "system",
  },
  {
    name: "Parmesan Cheese",
    category: "cheese",
    unit: "kg",
    quantity: 10,
    reorderThreshold: 3,
    costPrice: 120,
    createdBy: "system",
  },
  // 🥦 Veggies
  {
    name: "Green Peppers",
    category: "veggies",
    unit: "kg",
    quantity: 15,
    reorderThreshold: 5,
    costPrice: 40,
    createdBy: "system",
  },
  {
    name: "Onions",
    category: "veggies",
    unit: "kg",
    quantity: 25,
    reorderThreshold: 8,
    costPrice: 25,
    createdBy: "system",
  },
  {
    name: "Mushrooms",
    category: "veggies",
    unit: "kg",
    quantity: 12,
    reorderThreshold: 4,
    costPrice: 60,
    createdBy: "system",
  },
  // 🍖 Meat
  {
    name: "Pepperoni",
    category: "meat",
    unit: "kg",
    quantity: 18,
    reorderThreshold: 6,
    costPrice: 90,
    createdBy: "system",
  },
  {
    name: "Ham",
    category: "meat",
    unit: "kg",
    quantity: 12,
    reorderThreshold: 4,
    costPrice: 85,
    createdBy: "system",
  },
  // 🍅 Sauce
  {
    name: "Tomato Sauce",
    category: "sauce",
    unit: "liters",
    quantity: 30,
    reorderThreshold: 10,
    costPrice: 30,
    createdBy: "system",
  },
  {
    name: "Barbecue Sauce",
    category: "sauce",
    unit: "liters",
    quantity: 8,
    reorderThreshold: 3,
    costPrice: 45,
    createdBy: "system",
  },
  // 🍞 Dough
  {
    name: "Pizza Dough Balls",
    category: "dough",
    unit: "pieces",
    quantity: 100,
    reorderThreshold: 30,
    costPrice: 10,
    createdBy: "system",
  },
  // 🥤 Drinks
  {
    name: "Coca-Cola 500ml",
    category: "drinks",
    unit: "bottles",
    quantity: 50,
    reorderThreshold: 15,
    costPrice: 12,
    createdBy: "system",
  },
  {
    name: "Sparkling Water",
    category: "drinks",
    unit: "bottles",
    quantity: 30,
    reorderThreshold: 10,
    costPrice: 8,
    createdBy: "system",
  },
  // 📦 Other
  {
    name: "Pizza Boxes (Large)",
    category: "other",
    unit: "pieces",
    quantity: 200,
    reorderThreshold: 50,
    costPrice: 5,
    createdBy: "system",
  },
  {
    name: "Napkins Pack",
    category: "other",
    unit: "packs",
    quantity: 40,
    reorderThreshold: 10,
    costPrice: 15,
    createdBy: "system",
  },
];

async function seed() {
  try {
    await connectToDatabase();
    await Item.deleteMany({});
    await Item.insertMany(sampleItems);
    console.log("✅ Seeded database with sample items!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
}

seed();
