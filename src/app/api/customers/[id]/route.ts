import { NextRequest, NextResponse } from "next/server";
import db from "@/db/models";

const models: any = db
export async function GET(req: NextRequest, {params} : {params : {id: string}}) {
    const id = Number(params.id)
    try {
        const data = await models.Supplier.findOne({
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
        const supplier = await models.Supplier.update(input, {
            where: {
                id
            },
            returning: true,
            plain: true
        });
        return NextResponse.json({ data: supplier[1] })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}

export async function DELETE(req: NextRequest, {params} : {params : {id: string}}) {
    try {
        const id = Number(params.id)
        const supplier = await models.Supplier.findOne({ where: { id } });
        const deleteSupplier = await models.Supplier.destroy({
            where: { id }
        });
        if (!deleteSupplier) throw new Error('Failed to Delete Supplier')
        return NextResponse.json({ data: supplier })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}