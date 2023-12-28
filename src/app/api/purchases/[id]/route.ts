import { NextRequest, NextResponse } from "next/server";
import db from "@/db/sequelize/models";
import { deletePurchase } from "@/services/model";

const models: any = db
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = Number(params.id)
    try {
        const data = await models.Purchase.findOne({
            include: [models.Supplier, models.User],
            where: { id }
        })
        return NextResponse.json({ data })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id)
        const input = await req.json()
        const purchase = await models.Purchase.update(input, {
            where: {
                id
            },
            returning: true,
            plain: true
        });
        return NextResponse.json({ data: purchase[1] })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id)
        const purchase = await deletePurchase(id)
        return NextResponse.json({ data: purchase })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}