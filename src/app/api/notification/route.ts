import { NextRequest, NextResponse } from "next/server";
import db from "@/db/sequelize/models";
import { Op } from "sequelize";

const models: any = db

export async function GET(req: NextRequest, res: NextResponse) {
    const limit = req.nextUrl.searchParams.get('limit') || 5
    try {
        const notifs = await models.Good.findAll({
            where: {
                stock: { [Op.lte]: limit }
            },
        })
        return NextResponse.json({ data: notifs })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}
