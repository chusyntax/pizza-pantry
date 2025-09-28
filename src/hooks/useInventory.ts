import { useState, useCallback, useEffect } from "react";
import { Item } from "@/components/ItemCard";

export function useInventory() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [usernames, setUsernames] = useState<{ [id: string]: string }>({});

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/items");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUsernames = useCallback(async () => {
    try {
      const res = await fetch("/api/usernames");
      const data = await res.json();
      setUsernames(data);
    } catch (err) {
      console.error("Failed to fetch usernames", err);
    }
  }, []);

  useEffect(() => {
    fetchItems();
    fetchUsernames();
  }, [fetchItems, fetchUsernames]);

  const editItem = useCallback(
    async (item: Item) => {
      const res = await fetch(`/api/items/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const data = await res.json();
      if (data.ok) fetchItems();
      return data;
    },
    [fetchItems]
  );

  const adjustItem = useCallback(
    async (item: Item, amount: number) => {
      const res = await fetch(`/api/items/${item._id}/adjust`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delta: amount }),
      });
      const data = await res.json();
      if (data.ok) fetchItems();
      return data;
    },
    [fetchItems]
  );

  const deleteItem = useCallback(async (item: Item) => {
    const res = await fetch(`/api/items/${item._id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.ok) setItems((prev) => prev.filter((i) => i._id !== item._id));
    return data;
  }, []);

  return {
    items,
    loading,
    fetchItems,
    editItem,
    adjustItem,
    deleteItem,
    setItems,
    usernames,
  };
}
