import { NextRequest, NextResponse } from "next/server";
import db from "@/db/models";

const models: any = db
export async function GET(req: NextRequest, {params} : {params : {id: string}}) {
    const id = params.id
    try {
        const data = await models.User.findOne({
            where: { id }
        })
        return NextResponse.json({data})
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ err: error.message })
    }
}

export async function PUT(req: NextRequest, {params} : {params : {id: string}}) {
    try {
        const id = params.id
        const { email, name, role } = await req.json()
        const user = await models.User.update({ email, name, role }, {
            where: {
                id
            },
            returning: true,
            plain: true
        });
        return NextResponse.json({ data: user[1].sendData() })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ err: error.message })
    }
}

export async function DELETE(req: NextRequest, {params} : {params : {id: string}}) {
    try {
        const id = params.id
        const user = await models.User.findOne({ where: { id } });
        const deleteUser = await models.User.destroy({
            where: { id }
        });
        if (!deleteUser) throw new Error('Failed to Delete User')
        return NextResponse.json({ data: user })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ err: error.message })
    }
}