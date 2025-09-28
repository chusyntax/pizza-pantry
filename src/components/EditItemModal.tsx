import React from "react";
import { Item } from "./ItemCard";

interface EditItemModalProps {
  item: Item | null;
  onChange: (item: Item) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({
  item,
  onChange,
  onClose,
  onSubmit,
}) => {
  if (!item) return null;
  return (
    <div className="fixed inset-0 bg-[#031635] bg-opacity-95 flex items-center justify-center z-50">
      <form
        className="bg-[#1a2332] text-gray-200 p-6 rounded-lg shadow-2xl w-96 flex flex-col gap-4"
        onSubmit={onSubmit}
      >
        <h2 className="text-xl font-bold">Edit Item</h2>
        <input
          className="border p-2 rounded bg-gray-800 text-gray-200"
          value={item.name}
          onChange={(e) => onChange({ ...item, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="number"
          className="border p-2 rounded bg-gray-800 text-gray-200"
          value={item.reorderThreshold}
          onChange={(e) =>
            onChange({ ...item, reorderThreshold: parseInt(e.target.value) })
          }
          placeholder="Reorder Threshold"
          required
        />
        <input
          type="number"
          className="border p-2 rounded bg-gray-800 text-gray-200"
          value={item.costPrice}
          onChange={(e) =>
            onChange({ ...item, costPrice: parseFloat(e.target.value) })
          }
          placeholder="Cost Price"
          required
        />
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            className="px-3 py-1 bg-gray-700 text-gray-200 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditItemModal;
