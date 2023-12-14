import { NextRequest, NextResponse } from "next/server";
import db from "@/db/models";
import { Op } from "sequelize";
import fs from 'fs'
import path from "path";
import { setWriteFile } from "@/services/good";

const models: any = db

export async function GET(req: NextRequest, res: NextResponse) {
    const keyword = req.nextUrl.searchParams.get('keyword') || ''
    const page = Number(req.nextUrl.searchParams.get('page')) || 1
    const limit = JSON.parse(req.nextUrl.searchParams.get('limit') as string)
    const sort = req.nextUrl.searchParams.get('sort') || 'asc'
    const sortBy = req.nextUrl.searchParams.get('sortBy') || 'barcode'
    const offset = (page - 1) * limit
    const order = []

    if (sortBy === 'unit') order.push([models.Unit, sortBy, sort])
    order.push([sortBy, sort])

    try {
        const { count, rows } = await models.Good.findAndCountAll({
            include: models.Unit,
            where: {
                [Op.or]: [
                    { barcode: { [Op.like]: `%${keyword}%` } },
                    { name: { [Op.iLike]: `%${keyword}%` } },
                ]
            },
            order,
            limit,
            offset
        })
        const pages = Math.ceil(count / limit)
        return NextResponse.json({ data: { goods: rows, page, limit, offset, pages, total: count, sortBy, sort } })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const data = await req.formData();
        const dataGood = JSON.parse(data.get('data') as string)
        const file: any = data.get('image');
        const pathStorage = path.join(process.cwd(), 'public', 'imgGoods')

        if (!file) throw new Error('No files were Uploaded')

        const { fileName, buffer, filePath } = await setWriteFile(file, pathStorage)

        const result = await models.Good.create({ ...dataGood, picture: fileName })

        fs.writeFileSync(filePath, buffer)

        return NextResponse.json({ data: result })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}

