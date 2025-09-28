import React from "react";
import { Item } from "./ItemCard";

interface AdjustQuantityModalProps {
  item: Item | null;
  amount: number;
  onAmountChange: (amount: number) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AdjustQuantityModal: React.FC<AdjustQuantityModalProps> = ({
  item,
  amount,
  onAmountChange,
  onClose,
  onSubmit,
}) => {
  if (!item) return null;
  return (
    <div className="fixed inset-0 bg-[#031635] bg-opacity-95 flex items-center justify-center z-50">
      <form
        className="bg-[#1a2332] text-gray-200 p-6 rounded-lg shadow-2xl w-80 flex flex-col gap-4"
        onSubmit={onSubmit}
      >
        <h2 className="text-xl font-bold">Adjust Quantity: {item.name}</h2>
        <input
          type="number"
          className="border p-2 rounded bg-gray-800 text-gray-200"
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onAmountChange(parseInt(e.target.value))
          }
          placeholder="Enter amount (+/-)"
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
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdjustQuantityModal;
