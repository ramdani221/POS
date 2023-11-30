import { NextRequest, NextResponse } from "next/server";
import db from "@/db/models";

const models: any = db
export async function GET(req: NextRequest, {params} : {params : {id: string}}) {
    const id = Number(params.id)
    try {
        const data = await models.Unit.findOne({
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
        const { unit, name, note } = await req.json()
        const data = await models.Unit.update({ unit, name, note }, {
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
        const id = Number(params.id)
        const unit = await models.Unit.findOne({ where: { id } });
        const deleteUnit = await models.Unit.destroy({
            where: { id }
        });
        if (!deleteUnit) throw new Error('Failed to Delete Unit')
        return NextResponse.json({ data: unit })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}