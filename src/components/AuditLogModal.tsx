import React from "react";
import { Item } from "@/components/ItemCard";

interface AuditLogModalProps {
  item: Item;
  usernames: { [id: string]: string };
  onClose: () => void;
}

const AuditLogModal: React.FC<AuditLogModalProps> = ({
  item,
  usernames,
  onClose,
}) => {
  return (
    <div className="bg-[#1a2332] text-gray-200 p-6 rounded-lg shadow-2xl w-96 max-h-[80vh] overflow-y-auto flex flex-col gap-4">
      <h2 className="text-xl font-bold">Audit Log: {item.name}</h2>
      {item.auditLog && item.auditLog.length > 0 ? (
        <ul className="space-y-2 text-sm">
          {[...item.auditLog].reverse().map((entry, idx) => (
            <li key={idx} className="flex justify-between">
              <span className="font-mono text-gray-400">
                {new Date(entry.timestamp).toLocaleString()}
              </span>
              <span
                className={entry.delta >= 0 ? "text-green-400" : "text-red-400"}
              >
                {entry.delta >= 0 ? "+" : ""}
                {entry.delta}
              </span>
              <span className="text-purple-200 font-medium">
                {usernames[entry.userId] || entry.userId}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No changes yet</p>
      )}
      <button
        className="mt-4 px-3 py-1 bg-gray-700 text-gray-200 rounded hover:bg-gray-600 self-end"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default AuditLogModal;
