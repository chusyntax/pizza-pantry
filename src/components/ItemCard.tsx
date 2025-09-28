import { categoryEmojis } from "@/lib/categoryEmojis";
export type AuditEntry = {
  delta: number;
  userId: string;
  timestamp: string;
};

export type Item = {
  _id: string;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  reorderThreshold: number;
  costPrice: number;
  auditLog?: AuditEntry[];
};

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onAdjust: (item: Item) => void;
  onDelete: (item: Item) => void;
  onAudit: (item: Item) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onEdit,
  onAdjust,
  onDelete,
  onAudit,
}) => {
  return (
    <div className="p-4 rounded-lg bg-gray-800 text-gray-200 shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
      <h2 className="text-lg font-semibold">
        {categoryEmojis[item.category] || "📦"} {item.name}
      </h2>
      <p>
        <span className="font-medium">Quantity:</span> {item.quantity}
      </p>
      <p>
        <span className="font-medium">Unit:</span> {item.unit}
      </p>
      <p>
        <span className="font-medium">Reorder Threshold:</span>{" "}
        {item.reorderThreshold}
      </p>
      <p>
        <span className="font-medium">Cost Price:</span> $
        {item.costPrice.toFixed(2)}
      </p>
      <p className="bg-yellow-700 text-yellow-200 font-semibold px-2 py-1 rounded mt-2">
        💰 Running Total Value: {(item.quantity * item.costPrice).toFixed(2)}
      </p>
      <div className="flex gap-2 mt-3">
        <button
          className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => onEdit(item)}
        >
          Edit
        </button>
        <button
          className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => onAdjust(item)}
        >
          Adjust Qty
        </button>
        <button
          className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => onDelete(item)}
        >
          Delete
        </button>
        {item.auditLog && item.auditLog.length > 0 && (
          <button
            className="px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
            onClick={() => onAudit(item)}
          >
            View Audit Log
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
