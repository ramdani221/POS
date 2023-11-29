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
        const { count, rows } = await models.Unit.findAndCountAll({
            where: {
                [Op.or]: [
                    { unit: { [Op.iLike]: `%${keyword}%` } },
                    { name: { [Op.like]: `%${keyword}%` } },
                    { note: { [Op.like]: `%${keyword}%` } }
                ]
            },
            order: [[sortBy, sort]],
            limit,
            offset
        })
        const pages = Math.ceil(count / limit)
        return NextResponse.json({ data: { units: rows, page, limit, offset, pages, total: count, sortBy, sort } })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ err: error.message })
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { unit, name, note } = await req.json()
        const data = await models.Unit.create({ unit, name, note })
        return NextResponse.json({ data })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ err: error.message })
    }
}

