import { NextRequest, NextResponse } from "next/server";
import db from "@/db/models";
import { createSaleItem } from "@/services/model";

const models: any = db

export async function GET(req: NextRequest, res: NextResponse) {
    const invoice = req.nextUrl.searchParams.get('invoice') || ''
    try {
        const saleitems = await models.Saleitem.findAll({
            include: models.Good,
            where: { invoice },
            order: ['id']
        })
        return NextResponse.json({ data: saleitems })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const input = await req.json()
        const saleitem = await createSaleItem(input)
        return NextResponse.json({ data: saleitem })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}

