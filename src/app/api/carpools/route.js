import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Carpool from "@/models/Carpool";

export async function GET() {
  await connectToDatabase();

  try {
    const carpools = await Carpool.find().sort({ date: -1 });
    return NextResponse.json(carpools);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
