import { NextRequest, NextResponse } from "next/server";
import db from "@/db/sequelize/models";
import { findUser } from "@/services/services";

const models: any = db
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = Number(params.id)
    try {
        const data = await findUser(id)
        return NextResponse.json({ data })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id)
        const input = await req.json()
        const user = await models.User.update(input, {
            where: {
                id
            },
            returning: true,
            plain: true
        });
        return NextResponse.json({ data: user[1].sendData() })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id)
        const user = await findUser(id)
        const deleteUser = await models.User.destroy({
            where: { id }
        });
        if (!deleteUser) throw new Error('Failed to Delete User')
        return NextResponse.json({ data: user })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}