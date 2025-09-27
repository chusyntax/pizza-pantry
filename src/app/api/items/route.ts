import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Item } from "@/models/Item";
import { z } from "zod";
import { getAuth } from "@clerk/nextjs/server";

const addItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum([
    "cheese",
    "veggies",
    "meat",
    "sauce",
    "dough",
    "drinks",
    "other",
  ]),
  unit: z.string().min(1),
  quantity: z.number().min(0),
  reorderThreshold: z.number().min(0),
  costPrice: z.number().min(0),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );

    const body = await req.json();
    const data = addItemSchema.parse(body);

    await connectToDatabase();

    const item = await Item.create({
      ...data,
      createdBy: userId,
    });

    return NextResponse.json({ ok: true, item });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 400 }
    );
  }
}
