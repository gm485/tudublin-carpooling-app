import { connectToDatabase } from "@/lib/mongoose";
import Carpool from '@/models/Carpool'
import { NextResponse } from "next/server";


export async function GET(req, {params}) {
    try {
        await connectToDatabase()

        const userId =  params.userId

        if (!userId){
            return NextResponse.json({error: "user id required"}, {status: 400})
        }

        const carpools = await Carpool.find({passenger: userId}).sort({date: -1})

        return NextResponse.json({carpools})

    } catch (err) {
        console.error(err)
        return NextResponse.json({error: err.message}, {status: 500})
    }

}