import { connectToDatabase } from "@/lib/mongoose";
import User from '@/models/User'
import bcrypt from 'bcrypt'
import {sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { NextResponse } from "next/server";


export async function POST(req) {
    await connectToDatabase() 


    try {
        const {email, password} = await req.json()

        if (!email || !password) {
            return NextResponse.json({error: "email and password required"},{status: 400})
        }

        const user = await User.findOne({email})

        if(!user) {
            return NextResponse.json({error: "invalid user"}, {status: 401})
        }

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return NextResponse.json({error: "Password error"}, {status: 401})
        }

        const res = NextResponse.json({success: true, user: {id: user._id, name: user.name}})
        const session = await getIronSession(req, res, sessionOptions)

        session.user = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role
        }

        await session.save()
        
        return res



    } catch (err) {
        console.error(err)
        return NextResponse.json({error: "server error"}, {status: 500})
    }
}