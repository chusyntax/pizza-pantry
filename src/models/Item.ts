import { Schema, models, model } from "mongoose";

const ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    unit: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    reorderThreshold: { type: Number, required: true, default: 5 },
    costPrice: { type: Number, required: true, default: 0 },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

export const Item = models.Item || model("Item", ItemSchema);
