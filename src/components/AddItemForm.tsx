"use client";

import { useState } from "react";
import { z } from "zod";

const addItemSchema = z.object({
  name: z.string().min(1),
  category: z.enum([
    "cheese",
    "veggies",
    "meat",
    "sauce",
    "dough",
    "drinks",
    "other",
  ]),
  unit: z.string().min(1),
  quantity: z.number().min(0),
  reorderThreshold: z.number().min(0),
  costPrice: z.number().min(0),
});

const categories = [
  { value: "cheese", label: "🧀 Cheese" },
  { value: "veggies", label: "🥦 Veggies" },
  { value: "meat", label: "🍖 Meat" },
  { value: "sauce", label: "🍅 Sauce" },
  { value: "dough", label: "🍞 Dough" },
  { value: "drinks", label: "🥤 Drinks" },
  { value: "other", label: "📦 Other" },
];

export default function AddItemForm() {
  const [form, setForm] = useState({
    name: "",
    category: "cheese",
    unit: "",
    quantity: 0,
    reorderThreshold: 0,
    costPrice: 0,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["quantity", "reorderThreshold", "costPrice"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      addItemSchema.parse(form);
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setMessage("✅ Item added successfully!");
        setForm({
          name: "",
          category: "cheese",
          unit: "",
          quantity: 0,
          reorderThreshold: 0,
          costPrice: 0,
        });
      } else {
        setMessage("❌ Error: " + data.error);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setMessage("❌ Validation Error: " + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-gray-800 shadow rounded space-y-4"
    >
      <h2 className="text-xl font-bold mb-2">Add New Item</h2>

      <label className="block">
        Name
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1"
          required
        />
      </label>

      <label className="block">
        Category
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        Unit
        <input
          type="text"
          name="unit"
          value={form.unit}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1"
          required
        />
      </label>

      <label className="block">
        Quantity
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1"
        />
      </label>

      <label className="block">
        Reorder Threshold
        <input
          type="number"
          name="reorderThreshold"
          value={form.reorderThreshold}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1"
        />
      </label>

      <label className="block">
        Cost Price
        <input
          type="number"
          name="costPrice"
          value={form.costPrice}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Item"}
      </button>

      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
