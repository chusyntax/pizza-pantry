"use client";

import { useEffect, useState } from "react";
import { categoryEmojis } from "@/lib/categoryEmojis";
import { toast } from "react-toastify";

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

  // Modals
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [adjustItem, setAdjustItem] = useState<Item | null>(null);
  const [adjustAmount, setAdjustAmount] = useState(0);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/items");
      console.log("fetch response:", res);
      const data = await res.json();
      console.log("fetched data:", data);
      setItems(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const res = await fetch(`/api/items/${editingItem._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      const data = await res.json();
      if (data.ok) {
        fetchItems();
        setEditingItem(null);
        toast.success("Item updated successfully");
      } else {
        toast.error(data.error || "Failed to update item");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating item");
    }
  };

  const handleAdjustSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustItem) return;

    try {
      const res = await fetch(`/api/items/${adjustItem._id}/adjust`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delta: adjustAmount }),
      });
      const data = await res.json();
      if (data.ok) {
        fetchItems();
        setAdjustItem(null);
        setAdjustAmount(0);
        toast.success("Quantity adjusted successfully");
      } else {
        toast.error(data.error || "Failed to adjust quantity");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adjusting quantity");
    }
  };

  const handleDelete = async (item: Item) => {
    if (!confirm(`Are you sure you want to delete ${item.name}?`)) return;

    try {
      const res = await fetch(`/api/items/${item._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to delete item");

      setItems((prev) => prev.filter((i) => i._id !== item._id));
      toast.success("Item deleted successfully");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

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
            <div className="flex gap-2 mt-2">
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setEditingItem(item)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => setAdjustItem(item)}
              >
                Adjust Qty
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDelete(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            className="bg-white p-6 rounded shadow-lg w-96 flex flex-col gap-4"
            onSubmit={handleEditSubmit}
          >
            <h2 className="text-xl font-bold">Edit Item</h2>
            <input
              className="border p-2 rounded"
              value={editingItem.name}
              onChange={(e) =>
                setEditingItem({ ...editingItem, name: e.target.value })
              }
              placeholder="Name"
              required
            />
            <input
              type="number"
              className="border p-2 rounded"
              value={editingItem.reorderThreshold}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  reorderThreshold: parseInt(e.target.value),
                })
              }
              placeholder="Reorder Threshold"
              required
            />
            <input
              type="number"
              className="border p-2 rounded"
              value={editingItem.costPrice}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  costPrice: parseFloat(e.target.value),
                })
              }
              placeholder="Cost Price"
              required
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setEditingItem(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Adjust Quantity Modal */}
      {adjustItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            className="bg-white p-6 rounded shadow-lg w-80 flex flex-col gap-4"
            onSubmit={handleAdjustSubmit}
          >
            <h2 className="text-xl font-bold">
              Adjust Quantity: {adjustItem.name}
            </h2>
            <input
              type="number"
              className="border p-2 rounded"
              value={adjustAmount}
              onChange={(e) => setAdjustAmount(parseInt(e.target.value))}
              placeholder="Enter amount (+/-)"
              required
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setAdjustItem(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
