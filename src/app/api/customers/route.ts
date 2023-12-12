import { NextRequest, NextResponse } from "next/server";
import db from "@/db/models";
import { Op } from "sequelize";

const models: any = db

export async function GET(req: NextRequest, res: NextResponse) {
    const keyword = req.nextUrl.searchParams.get('keyword') || ''
    const page = Number(req.nextUrl.searchParams.get('page')) || 1
    const limit = JSON.parse(req.nextUrl.searchParams.get('limit') as string)
    const sort = req.nextUrl.searchParams.get('sort') || 'asc'
    const sortBy = req.nextUrl.searchParams.get('sortBy') || 'id'
    const offset = (page - 1) * limit

    try {
        const { count, rows } = await models.Supplier.findAndCountAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${keyword}%` } },
                    { address: { [Op.iLike]: `%${keyword}%` } },
                    { phone: { [Op.like]: `%${keyword}%` } }
                ]
            },
            order: [[sortBy, sort]],
            limit,
            offset
        })
        const pages = Math.ceil(count / limit)
        return NextResponse.json({ data: { suppliers: rows, page, limit, offset, pages, total: count, sortBy, sort } })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const input = await req.json()
        const supplier = await models.Supplier.create(input)
        return NextResponse.json({ data: supplier })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}

