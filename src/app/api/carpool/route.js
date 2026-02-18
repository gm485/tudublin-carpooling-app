import Carpool from '@/models/Carpool.js'
import { connectToDatabase } from '@/lib/mongoose';
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";

export async function POST(req){
    try {
        await connectToDatabase()
        //user
        const res = NextResponse.next()
        const session = await getIronSession(req, res, sessionOptions)

        if (!session.user) {
            return NextResponse.json({success: false, error: "Unauthorized"}, {status: 400})
        }

        const body = await req.json()

        const newCarpool = await Carpool.create({
            origin: body.origin,

            originLat: body.originLat,
            originLng: body.originLng,

            destination: body.destination,

            destinationLat: body.destinationLat,
            destinationLng: body.destinationLng,


            date: new Date(body.date),

            seatsAvailable: body.seatsAvailable || 1,
            driver: session.user.id
        })
        return NextResponse.json({success: true, carpool: newCarpool})
    } catch (err){
        console.error(err)
        return NextResponse.json({success: false, error: err.message}, {status: 500})
    }
}