import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";

export async function GET(req) {
    const res = NextResponse.next()
    const session = await getIronSession(req, res, sessionOptions)

    if (!session.user) {
        return NextResponse.json({user: null})
    }


    return NextResponse.json({user: session.user} )
}