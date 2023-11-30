import { NextRequest, NextResponse } from "next/server";
import db from "@/db/models";
import { Op } from "sequelize";
import fs from "fs"
import path from "path";

const models: any = db

export async function GET(req: NextRequest, res: NextResponse) {
    const keyword = req.nextUrl.searchParams.get('keyword') || ''
    const page = Number(req.nextUrl.searchParams.get('page')) || 1
    const limit = Number(req.nextUrl.searchParams.get('limit')) || 3
    const sort = req.nextUrl.searchParams.get('sort') || 'asc'
    const sortBy = req.nextUrl.searchParams.get('sortBy') || 'barcode'
    const offset = (page - 1) * limit

    try {
        const { count, rows } = await models.Good.findAndCountAll({
            where: {
                [Op.or]: [
                    { barcode: { [Op.like]: `%${keyword}%` } },
                    { name: { [Op.iLike]: `%${keyword}%` } },
                ]
            },
            order: [[sortBy, sort]],
            limit,
            offset,
        })
        const pages = Math.ceil(count / limit)
        return NextResponse.json({ data: { goods: rows, page, limit, offset, pages, total: count, sortBy, sort } })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { barcode, name, stock, purchaseprice, sellingprice, unit, picture } = await req.json()
        const data = await models.Good.create({ barcode, name, stock, purchaseprice, sellingprice, unit, picture })
        return NextResponse.json({ data})
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}

