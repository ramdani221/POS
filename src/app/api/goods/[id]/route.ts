import { NextRequest, NextResponse } from "next/server";
import db from "@/db/models";

const models: any = db
export async function GET(req: NextRequest, {params} : {params : {id: string}}) {
    const id = Number(params.id)
    try {
        const data = await models.Good.findOne({
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
        const { barcode, name, stock, purchaseprice, sellingprice, unit, picture } = await req.json()
        const data = await models.Good.update({ barcode, name, stock, purchaseprice, sellingprice, unit, picture }, {
            where: {
                id
            },
            returning: true,
            plain: true
        });
        return NextResponse.json({ data: data[1] })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}

export async function DELETE(req: NextRequest, {params} : {params : {id: string}}) {
    try {
        const id = params.id
        const good = await models.Good.findOne({ where: { id } });
        const deleteGood = await models.Good.destroy({
            where: { id }
        });
        if (!deleteGood) throw new Error('Failed to Delete Good')
        return NextResponse.json({ data: good })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}