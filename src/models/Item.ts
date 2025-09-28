import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

const AuditSchema = new Schema(
  {
    delta: { type: Number, required: true },
    userId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    unit: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    reorderThreshold: { type: Number, required: true, default: 5 },
    costPrice: { type: Number, required: true, default: 0 },
    createdBy: { type: String, required: true },
    auditLog: { type: [AuditSchema], default: [] },
  },
  { timestamps: true }
);

export const Item = models.Item || model("Item", ItemSchema);
export const Audit = AuditSchema;
