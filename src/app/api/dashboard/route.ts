import db, { sequelize } from "@/db/models";
import { monthReport } from "@/services/model";
import { NextRequest, NextResponse } from "next/server";
import { HasMany, Op } from "sequelize";

const models: any = db

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const keyword = req.nextUrl.searchParams.get('keyword') || null
        const limit = req.nextUrl.searchParams.get('limit') || '3'
        const strDate = req.nextUrl.searchParams.get('strDate')
        const endDate = req.nextUrl.searchParams.get('endDate')
        const sortBy = req.nextUrl.searchParams.get('sortBy') || 'monthly'
        const sort = req.nextUrl.searchParams.get('sort') || 'asc'
        const page = req.nextUrl.searchParams.get('page') || "1"
        
        const params: any = {}
        const offset = (Number(page) - 1) * Number(limit)

        if (strDate && endDate) params['createdAt'] = { [Op.between]: [new Date(strDate), new Date(`${endDate} 23:59:59.999`)] }
        else if (strDate) params.createdAt = { [Op.gte]: new Date(strDate) }
        else if (endDate) params.createdAt = { [Op.lte]: new Date(`${endDate} 23:59:59.999`) }

        const totPurchase = await models.Purchase.sum('totalsum', {
            where: params
        })
        const totSelling = await models.Sale.sum('totalsum', {
            where: params
        })
        const totSales = await models.Sale.count({
            where: params
        })

        const nonMember = await models.Sale.count({
            where: {...params, customer: 8}
        })

        const { total, report } = await monthReport(keyword, sortBy, sort, Number(limit), offset, strDate, endDate)
        const pages = Math.ceil(total / Number(limit))

        return NextResponse.json({ data: { totPurchase, totSelling, totSales, nonMember, report, page: Number(page), limit, offset, pages, total, sortBy, sort } })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error })
    }
}