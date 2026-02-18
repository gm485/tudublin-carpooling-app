// src/app/api/users/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";

export async function POST(req) {
  await connectToDatabase();

  try {
    const body = await req.json();

    // Check if email already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // Create user
    const newUser = await User.create({
      name: body.name,
      email: body.email,
      phoneNumber: body.phoneNumber,
      password: hashedPassword,
      role: body.role,
    });

    // Create session
    const res = NextResponse.json({
      success: true,
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
    });

    const session = await getIronSession(req, res, sessionOptions);
    session.user = { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role };
    await session.save();

    return res;
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}