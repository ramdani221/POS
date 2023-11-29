import { NextRequest, NextResponse } from "next/server";
import db from "@/db/models";
import { Op } from "sequelize";

const models: any = db

export async function GET(req: NextRequest, res: NextResponse) {
    const keyword = req.nextUrl.searchParams.get('keyword') || ''
    const page = Number(req.nextUrl.searchParams.get('page')) || 1
    const limit = Number(req.nextUrl.searchParams.get('limit')) || 3
    const sort = req.nextUrl.searchParams.get('sort') || 'asc'
    const sortBy = req.nextUrl.searchParams.get('sortBy') || 'id'
    const offset = (page - 1) * limit

    try {
        const { count, rows } = await models.User.findAndCountAll({
            where: {
                [Op.or]: [
                    { email: { [Op.iLike]: `%${keyword}%` } },
                    { name: { [Op.iLike]: `%${keyword}%` } }
                ]
            },
            order: [[sortBy, sort]],
            limit,
            offset
        })
        const pages = Math.ceil(count / limit)
        return NextResponse.json({ data: { users: rows, page, limit, offset, pages, total: count, sortBy, sort } })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { email, name, password, role } = await req.json()
        const user = await models.User.create({ email, name, password, role })
        return NextResponse.json({ data: user.sendData() })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}

