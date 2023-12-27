import { NextRequest, NextResponse } from "next/server";
import db from "@/db/sequelize/models";

const models: any = db
export async function GET(req: NextRequest, {params} : {params : {id: string}}) {
    const id = Number(params.id)
    try {
        const data = await models.Customer.findOne({
            where: { id }
        })
        return NextResponse.json({data})
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}

export async function PUT(req: NextRequest, {params} : {params : {id: string}}) {
    try {
        const id = Number(params.id)
        const input = await req.json()
        const custoer = await models.Customer.update(input, {
            where: {
                id
            },
            returning: true,
            plain: true
        });
        return NextResponse.json({ data: custoer[1] })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}

export async function DELETE(req: NextRequest, {params} : {params : {id: string}}) {
    try {
        const id = Number(params.id)
        const custoer = await models.Customer.findOne({ where: { id } });
        const deleteCustomer = await models.Customer.destroy({
            where: { id }
        });
        if (!deleteCustomer) throw new Error('Failed to Delete Customer')
        return NextResponse.json({ data: custoer })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}