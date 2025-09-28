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
    if (typeof delta !== "number")
      return NextResponse.json(
        { ok: false, error: "Delta must be a number" },
        { status: 400 }
      );

    await connectToDatabase();

    const item = await Item.findById(params.id);
    if (!item)
      return NextResponse.json(
        { ok: false, error: "Item not found" },
        { status: 404 }
      );

    // Update quantity
    item.quantity += delta;
    item.updatedAt = new Date();

    // Ensure auditLog exists
    if (!item.auditLog) {
      item.auditLog = [];
    }

    // Add audit entry
    item.auditLog.push({
      delta,
      userId,
      timestamp: new Date(),
    });

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
