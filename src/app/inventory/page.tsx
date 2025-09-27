"use client";

import { useEffect, useState } from "react";
import { categoryEmojis } from "@/lib/categoryEmojis";

type Item = {
  _id: string;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  reorderThreshold: number;
  costPrice: number;
};

export default function InventoryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/items");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <p className="p-6">Loading inventory...</p>;
  if (items.length === 0)
    return <p className="p-6">No items in inventory yet.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📦 Inventory</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item._id}
            className="p-4 border rounded-lg shadow-sm bg-white flex flex-col gap-2"
          >
            <h2 className="text-lg font-semibold">
              {categoryEmojis[item.category] || "📦"} {item.name}
            </h2>
            <p>
              <span className="font-medium">Quantity:</span> {item.quantity}{" "}
              {item.unit}
            </p>
            <p>
              <span className="font-medium">Reorder Threshold:</span>{" "}
              {item.reorderThreshold}
            </p>
            <p>
              <span className="font-medium">Cost Price:</span> $
              {item.costPrice.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
