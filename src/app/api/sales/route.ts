import { NextRequest, NextResponse } from "next/server";
import db from "@/db/sequelize/models";
import { Op } from "sequelize";

const models: any = db

export async function GET(req: NextRequest, res: NextResponse) {
    const keyword = req.nextUrl.searchParams.get('keyword') || ''
    const page = Number(req.nextUrl.searchParams.get('page')) || 1
    const limit = Number(req.nextUrl.searchParams.get('limit')) || 3
    const sort = req.nextUrl.searchParams.get('sort') || 'asc'
    const sortBy = req.nextUrl.searchParams.get('sortBy') || 'invoice'
    const offset = (page - 1) * limit
    const order = []

    if (sortBy === 'customer') order.push([models.Customer, 'name', sort])
    order.push([sortBy, sort])

    try {
        const { count, rows } = await models.Sale.findAndCountAll({
            include: [models.Customer, models.User],
            where: { invoice: { [Op.iLike]: `%${keyword}%` } },
            order,
            limit,
            offset
        })
        const pages = Math.ceil(count / limit)
        return NextResponse.json({ data: { sales: rows, page, limit, offset, pages, total: count, sortBy, sort } })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const input = await req.json()
        const sale = await models.Sale.create(input)
        return NextResponse.json({ data: sale })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}

