import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Item } from "@/models/Item";
import { getAuth } from "@clerk/nextjs/server";

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

    const { delta } = await req.json();
    await connectToDatabase();

    const item = await Item.findById(params.id);
    if (!item)
      return NextResponse.json(
        { ok: false, error: "Item not found" },
        { status: 404 }
      );

    item.quantity += delta;
    item.updatedAt = new Date();
    await item.save();

    return NextResponse.json({ ok: true, item });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: err.message || "Unknown error" },
      { status: 400 }
    );
  }
}
