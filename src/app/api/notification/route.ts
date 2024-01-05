import connectDB from "@/db/mongoose/connectdb";
import Notif from "@/db/mongoose/models/Notif";
import { getNotifs } from "@/services/model";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function GET(req: NextRequest, res: NextResponse) {
    const limit = req.nextUrl.searchParams.get('limit') || 5
    try {
        const { count, notifs } = await getNotifs()
        return NextResponse.json({ data: { notifs, count } })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const input = await req.json()
        const data = await Notif.create(input)
        return NextResponse.json({ data })
    } catch (error: any) {
        throw NextResponse.json({ error: error.message })
    }
}