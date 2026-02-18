import { getIronSession } from "iron-session";
import { sessionOptions } from "@/app/lib/session";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const res = NextResponse.next();
    const session = await getIronSession(req, res, sessionOptions);

    // Destroy session
    session.destroy();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
