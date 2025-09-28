import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Item } from "@/models/Item";

export async function GET() {
  try {
    await connectToDatabase();

    const count = await Item.countDocuments();

    return NextResponse.json({ ok: true, count });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
