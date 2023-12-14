import { NextRequest, NextResponse } from "next/server";
import db from "@/db/models";
import { deleteSale } from "@/services/model";

const models: any = db
export async function GET(req: NextRequest, {params} : {params : {id: string}}) {
    const id = Number(params.id)
    try {
        const data = await models.Sale.findOne({
            include: [models.Customer, models.User],
            where: { id }
        })
        return NextResponse.json({data})
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}

export async function PUT(req: NextRequest, {params} : {params : {id: string}}) {
    try {
        const id = Number(params.id)
        const input = await req.json()
        const sale = await models.Sale.update(input, {
            where: {
                id
            },
            returning: true,
            plain: true
        });
        return NextResponse.json({ data: sale[1] })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}

export async function DELETE(req: NextRequest, {params} : {params : {id: string}}) {
    try {
        const id = Number(params.id)
        const sale = await deleteSale(id)
        return NextResponse.json({ data: sale })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}