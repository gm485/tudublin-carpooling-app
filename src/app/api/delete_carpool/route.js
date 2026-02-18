import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Carpool from '@/models/Carpool'
import { connectToDatabase } from '../../lib/mongoose'
export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: 'Invalid or missing carpool id' },
                { status: 400 }
            )
        }

        await connectToDatabase()

        const deleted = await Carpool.findByIdAndDelete(id)
        if (!deleted) {
            return NextResponse.json({ success: false, error: 'Carpool not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ success: false, error: err.message }, { status: 500 })
    }
}
