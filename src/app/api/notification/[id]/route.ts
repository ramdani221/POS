import connectDB from "@/db/mongoose/connectdb";
import Notif from "@/db/mongoose/models/Notif";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const _id = params.id
    try {
        const input = await req.json()
        const notif = await Notif.findByIdAndUpdate(params.id, input, { new: true })
        return NextResponse.json({ data: notif })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}