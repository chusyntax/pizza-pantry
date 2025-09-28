"use client";

import { useState, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import ItemCard, { Item } from "@/components/ItemCard";
import EditItemModal from "@/components/EditItemModal";
import AdjustQuantityModal from "@/components/AdjustQuantityModal";
import AuditLogModal from "@/components/AuditLogModal";
import { useInventory } from "@/hooks/useInventory";
import { categoryEmojis } from "@/lib/categoryEmojis";

export default function InventoryPage() {
  const { items, loading, editItem, adjustItem, deleteItem, usernames } =
    useInventory();
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [adjustItemState, setAdjustItem] = useState<Item | null>(null);
  const [adjustAmount, setAdjustAmount] = useState(0);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortField, setSortField] = useState<"name" | "quantity">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [auditItem, setAuditItem] = useState<Item | null>(null);
  const ITEMS_PER_PAGE = 6;

  const handleAdjustSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (adjustItemState) {
      await adjustItem(adjustItemState, adjustAmount);
      toast.success("Quantity adjusted!");
      setAdjustItem(null);
      setAdjustAmount(0);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingItem) {
      await editItem(editingItem);
      toast.success("Item updated!");
      setEditingItem(null);
    }
  };

  const handleDelete = async (item: Item) => {
    if (
      window.confirm(
        `Are you sure you want to delete '${item.name}'? This cannot be undone.`
      )
    ) {
      await deleteItem(item);
      toast.success("Item deleted!");
    }
  };

  const filteredItems = useMemo(() => {
    let result = [...items];
    if (search)
      result = result.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
      );
    if (categoryFilter)
      result = result.filter((i) => i.category === categoryFilter);
    result.sort((a, b) => {
      const compare =
        sortField === "name"
          ? a.name.localeCompare(b.name)
          : a.quantity - b.quantity;
      return sortDirection === "asc" ? compare : -compare;
    });
    return result;
  }, [items, search, categoryFilter, sortField, sortDirection]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, page]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const runningTotal = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  if (loading) return <p className="p-6">Loading inventory...</p>;

  return (
    <div className="p-6">
      <SignedIn>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-100">📦 Inventory</h1>
        </div>
        <div className="mb-2 text-lg text-gray-300 font-semibold">
          Running Total: <span className="text-blue-400">{runningTotal}</span>
        </div>
        <div className="flex gap-2 flex-wrap mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            className="border p-2 rounded flex-1 bg-gray-700 text-gray-200"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
          <select
            className="border p-2 rounded bg-gray-700 text-gray-200"
            value={categoryFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCategoryFilter(e.target.value)
            }
          >
            <option value="">All categories</option>
            {Object.entries(categoryEmojis).map(([cat, emoji]) => (
              <option key={cat} value={cat}>
                {emoji} {cat}
              </option>
            ))}
          </select>
          <select
            className="border p-2 rounded bg-gray-700 text-gray-200"
            value={sortField}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortField(e.target.value as "name" | "quantity")
            }
          >
            <option value="name">Sort by Name</option>
            <option value="quantity">Sort by Quantity</option>
          </select>
          <select
            className="border p-2 rounded bg-gray-700 text-gray-200"
            value={sortDirection}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortDirection(e.target.value as "asc" | "desc")
            }
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {paginatedItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onEdit={(item: Item) => {
                setEditingItem(item);
                toast.info("Editing item...");
              }}
              onAdjust={(item: Item) => {
                setAdjustItem(item);
                toast.info("Adjusting quantity...");
              }}
              onDelete={handleDelete}
              onAudit={(item: Item) => {
                setAuditItem(item);
                toast.info("Viewing audit log...");
              }}
            />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex gap-2 justify-center mt-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded ${
                  page === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
        <EditItemModal
          item={editingItem}
          onChange={setEditingItem}
          onClose={() => setEditingItem(null)}
          onSubmit={handleEditSubmit}
        />
        <AdjustQuantityModal
          item={adjustItemState}
          amount={adjustAmount}
          onAmountChange={setAdjustAmount}
          onClose={() => setAdjustItem(null)}
          onSubmit={handleAdjustSubmit}
        />
        {auditItem && (
          <div className="fixed inset-0 bg-[#031635] bg-opacity-95 flex items-center justify-center z-50">
            <AuditLogModal
              item={auditItem}
              usernames={usernames}
              onClose={() => setAuditItem(null)}
            />
          </div>
        )}
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <h1 className="text-xl font-bold text-center">
            In order to use this app&apos;s features, please log in or sign up.
          </h1>
          <div className="flex gap-4">
            <SignInButton>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}
