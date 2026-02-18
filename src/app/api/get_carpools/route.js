import { connectToDatabase } from "@/app/lib/mongoose";
import Carpool from '@/models/Carpool';
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDatabase();

    // fetch all carpools, sorted by date descending
    const carpools = await Carpool.find().sort({ date: -1 });

    return NextResponse.json({ carpools });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}