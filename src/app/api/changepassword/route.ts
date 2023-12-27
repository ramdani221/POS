import { NextRequest, NextResponse } from "next/server";
import db from "@/db/sequelize/models";

const models: any = db

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const input = await req.json()
        const findUser = await models.User.scope(null).findOne({ where: { id: input.id } })
        if(!findUser.checkPassword(input.oldPassword)) throw new Error('Old Password is Wrong')
        if(input.newPassword !== input.rePassword) throw new Error("Retype Password is Dosn't Match" )
        const user = await models.User.update({ password: input.newPassword }, {
            where: {
                id: input.id
            },
            returning: true,
            individualHooks: true,
        });
        return NextResponse.json({ data: user[1] })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}