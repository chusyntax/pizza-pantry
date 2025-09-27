import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Item } from "@/models/Item";
import { z } from "zod";
import { getAuth } from "@clerk/nextjs/server";

const editItemSchema = z.object({
  name: z.string().min(1),
  reorderThreshold: z.number().min(0),
  costPrice: z.number().min(0),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );

    const body = await req.json();
    const data = editItemSchema.parse(body);

    await connectToDatabase();

    const updated = await Item.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );

    if (!updated)
      return NextResponse.json(
        { ok: false, error: "Item not found" },
        { status: 404 }
      );

    return NextResponse.json({ ok: true, item: updated });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: err.message || "Unknown error" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const deleted = await Item.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json(
        { ok: false, error: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, message: "Item deleted" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const items = await Item.find({}).sort({ name: 1 });
    return NextResponse.json(items);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
