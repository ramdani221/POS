import { NextRequest, NextResponse } from "next/server";
import db from "@/db/models";
import { createPurchaseItem } from "@/services/model";

const models: any = db

export async function GET(req: NextRequest, res: NextResponse) {
    const invoice = req.nextUrl.searchParams.get('invoice') || ''
    try {
        const purchaseitems = await models.Purchaseitem.findAll({
            include: models.Good,
            where: { invoice },
            order: ['id']
        })
        return NextResponse.json({ data: purchaseitems })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const input = await req.json()
        const purchaseitem = await createPurchaseItem(input)
        return NextResponse.json({ data: purchaseitem })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}

