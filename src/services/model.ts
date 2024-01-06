import Notif from "@/db/mongoose/models/Notif";
import db, { sequelize } from "@/db/sequelize/models";
import { Op, QueryTypes } from "sequelize";

const models: any = db

export async function deletePurchase(id: number | string) {
    try {
        const purchase = await models.Purchase.update({
            deleted: true
        }, {
            where: { id },
            returning: true,
            plain: true
        })
        await deletePurchaseItems(purchase[1].id)
        return purchase[1]
    } catch (error) {
        throw error
    }
}

async function deletePurchaseItems(purchaseId: number | string) {
    try {
        const purchaseitems = await models.Purchaseitem.findAll({
            where: { invoice: purchaseId }
        })
        purchaseitems.forEach(async (item: any) => {
            await models.Good.decrement('stock', {
                by: item.quantity,
                where: { id: item.itemcode }
            })
        });
    } catch (error) {
        throw error
    }
}

export async function deletePurchaseItem(id: number | string) {
    try {
        const purchaseitem = await models.Purchaseitem.findOne({
            where: { id }
        })
        await models.Good.decrement('stock', {
            by: purchaseitem.quantity,
            where: { id: purchaseitem.itemcode }
        })
        await models.Purchaseitem.destroy({ where: { id } })
        return purchaseitem
    } catch (error) {
        throw error
    }
}

export async function createPurchaseItem(input: PurchaseitemInput) {
    try {
        const findPurchaseitem = await models.Purchaseitem.findOne({
            where: {
                [Op.and]: [
                    { itemcode: input.itemcode },
                    { invoice: input.invoice }
                ]
            }
        })
        if (findPurchaseitem) {
            await findPurchaseitem.increment('totalprice', {
                by: input.totalprice
            })
            const purchaseitem = await findPurchaseitem.increment('quantity', {
                by: input.quantity
            });
            await models.Good.increment('stock', {
                by: input.quantity,
                where: { id: input.itemcode }
            });
            return purchaseitem
        }
        const newPurchaseitem = await models.Purchaseitem.create(input);
        const purchaseitem = await models.Purchaseitem.findOne({
            where: { id: newPurchaseitem.id },
            include: models.Good
        })
        models.Good.increment('stock', {
            by: input.quantity,
            where: { id: input.itemcode }
        });
        return purchaseitem
    } catch (error) {
        throw error
    }
}

export async function deleteSale(id: number | string) {
    try {
        const sale = await models.Sale.update({
            deleted: true
        }, {
            where: { id },
            returning: true,
            plain: true
        })
        await deleteSaleItems(sale[1].id)
        return sale[1]
    } catch (error) {
        throw error
    }
}

async function deleteSaleItems(saleId: number | string) {
    try {
        const saleitems = await models.Saleitem.findAll({
            where: { invoice: saleId }
        })
        saleitems.forEach(async (item: any) => {
            await models.Good.increment('stock', {
                by: item.quantity,
                where: { id: item.itemcode }
            })
        });
    } catch (error) {
        throw error
    }
}

export async function deleteSaleItem(id: number | string) {
    try {
        const saleitem = await models.Saleitem.findOne({ 
            where: { id } 
        })
        await models.Good.increment('stock', {
            by: saleitem.quantity,
            where: { id: saleitem.itemcode }
        })
        await models.Saleitem.destroy({ where: { id } })
        return saleitem
    } catch (error) {
        throw error
    }
}

export async function createSaleItem(input: SaleitemInput) {
    try {
        const findSaleitem = await models.Saleitem.findOne({
            where: {
                [Op.and]: [
                    { itemcode: input.itemcode },
                    { invoice: input.invoice }
                ]
            }
        })
        if (findSaleitem) {
            await findSaleitem.increment('totalprice', { 
                by: input.totalprice 
            })
            const saleitem = await findSaleitem.increment('quantity', { 
                by: input.quantity 
            });
            await models.Good.decrement('stock', {
                by: input.quantity,
                where: { id: input.itemcode }
            });
            return saleitem
        }
        const newSaleitem = await models.Saleitem.create(input);
        const saleitem = await models.Saleitem.findOne({
            where: { id: newSaleitem.id },
            include: models.Good
        })
        models.Good.decrement('stock', {
            by: input.quantity,
            where: { id: input.itemcode }
        });
        return saleitem
    } catch (error) {
        throw error
    }
}

export async function monthReport(keyword: string | null, sortBy: string, sort: string, limit: number, offset: number, strDate: string | null, endDate: string | null) {
    let sql = `SELECT date.monthly, date.name, purchases.totalsum as expense, sales.totalsum as revenue,
    (CASE WHEN sales.totalsum IS NULL THEN 0 ELSE sales.totalsum END - CASE WHEN purchases.totalsum IS NULL THEN 0 ELSE purchases.totalsum END) as earning
    FROM`
    const queries = []
    const params = []
    if (strDate && endDate) {
        params.push(new Date(strDate), new Date(`${endDate} 23:59:59.999`))
        queries.push(`(SELECT CONCAT(extract(year FROM "createdAt"), '-', extract(month FROM "createdAt")) as monthly, to_char("createdAt", 'Mon yy') as "name" FROM public."Purchases" WHERE deleted = false and "createdAt" BETWEEN $${params.length - 1} and $${params.length}
        UNION SELECT CONCAT(extract(year FROM "createdAt"), '-', extract(month FROM "createdAt")) as monthly, to_char("createdAt", 'Mon yy') as "name" FROM public."Sales" WHERE deleted = false and "createdAt" BETWEEN $${params.length - 1} and $${params.length}) date
        FULL OUTER JOIN  (SELECT SUM(totalsum)as totalsum, CONCAT(extract(year FROM "createdAt"), '-', extract(month FROM "createdAt")) as time FROM public."Purchases" WHERE deleted = false and "createdAt" BETWEEN $${params.length - 1} and $${params.length} GROUP BY time) purchases ON date.monthly = purchases.time
        FULL OUTER JOIN (SELECT SUM(totalsum)as totalsum, CONCAT(extract(year FROM "createdAt"), '-', extract(month FROM "createdAt")) as time FROM public."Sales" WHERE deleted = false and "createdAt" BETWEEN $${params.length - 1} and $${params.length} GROUP BY time) sales ON date.monthly = sales.time`)
    } else if (strDate) {
        params.push(new Date(strDate))
        queries.push(`(SELECT CONCAT(extract(year FROM "createdAt"), '-', extract(month FROM "createdAt")) as monthly, to_char("createdAt", 'Mon yy') as "name" FROM public."Purchases" WHERE deleted = false and "createdAt" >= $${params.length}
        UNION SELECT CONCAT(extract(year FROM "createdAt"), '-', extract(month FROM "createdAt")) as monthly, to_char("createdAt", 'Mon yy') as "name" FROM public."Sales" WHERE deleted = false and "createdAt" >= $${params.length}) date
        FULL OUTER JOIN  (SELECT SUM(totalsum)as totalsum, CONCAT(extract(year FROM "createdAt"), '-', extract(month FROM "createdAt")) as time FROM public."Purchases" WHERE deleted = false and "createdAt" >= $${params.length} GROUP BY time) purchases ON date.monthly = purchases.time
        FULL OUTER JOIN (SELECT SUM(totalsum)as totalsum, CONCAT(extract(year FROM "createdAt"), '-', extract(month FROM "createdAt")) as time FROM public."Sales" WHERE deleted = false and "createdAt" >= $${params.length} GROUP BY time) sales ON date.monthly = sales.time`)
    }
    else if (endDate) {
        params.push(new Date(`${endDate} 23:59:59.999`))
        queries.push(`(SELECT CONCAT(extract(year FROM "createdAt"), '-', extract(month FROM "createdAt")) as monthly, to_char("createdAt", 'Mon yy') as "name" FROM public."Purchases" WHERE deleted = false and "createdAt" <= $${params.length}
        UNION SELECT CONCAT(extract(year FROM "createdAt"), '-', extract(month FROM "createdAt")) as monthly, to_char("createdAt", 'Mon yy') as "name" FROM public."Sales" WHERE deleted = false and "createdAt" <= $${params.length}) date
        FULL OUTER JOIN  (SELECT SUM(totalsum)as totalsum, CONCAT(extract(year FROM "createdAt"), '-', extract(month FROM "createdAt")) as time FROM public."Purchases" WHERE deleted = false and "createdAt" <= $${params.length} GROUP BY time) purchases ON date.monthly = purchases.time
        FULL OUTER JOIN (SELECT SUM(totalsum)as totalsum, CONCAT(extract(year FROM "createdAt"), '-', extract(month FROM "createdAt")) as time FROM public."Sales" WHERE deleted = false and "createdAt" <= $${params.length} GROUP BY time) sales ON date.monthly = sales.time`)
    }
    else {
        queries.push(`(SELECT CONCAT(extract(year FROM "createdAt"), '-', extract(month FROM "createdAt")) as monthly, to_char("createdAt", 'Mon yy') as "name" FROM public."Purchases" WHERE deleted = false 
        UNION SELECT CONCAT(extract(year FROM "createdAt"), '-', extract(month FROM "createdAt")) as monthly, to_char("createdAt", 'Mon yy') as "name" FROM public."Sales" WHERE deleted = false) date
        FULL OUTER JOIN  (SELECT SUM(totalsum)as totalsum, CONCAT(extract(year FROM "createdAt"), '-', extract(month FROM "createdAt")) as time FROM public."Purchases" WHERE deleted = false GROUP BY time) purchases ON date.monthly = purchases.time
        FULL OUTER JOIN (SELECT SUM(totalsum)as totalsum, CONCAT(extract(year FROM "createdAt"), '-', extract(month FROM "createdAt")) as time FROM public."Sales" WHERE deleted = false GROUP BY time) sales ON date.monthly = sales.time`)
    }

    if (keyword) {
        params.push(keyword)
        queries.push(`WHERE name ilike '%' || $${params.length} || '%'`)
    }

    sql += ` ${queries.join(' ')}`

    try {
        const count = await sequelize.query(sql, {
            bind: params,
            type: QueryTypes.SELECT
        })

        sql += ` ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`

        const report = await sequelize.query(sql,
            {
                bind: params,
                type: QueryTypes.SELECT
            })

        return { total: count.length, report }
    } catch (error) {
        throw error
    }
}

export async function getNotifs() {
    try {
        const notifsUnRead = await Notif.find({ isRead: false }).sort({ createdAt: 'asc' })
        if (notifsUnRead.length < 1) return { count: notifsUnRead.length, notifs: [] }
        const allNotifs = await Notif.find({
            createdAt: {
                '$gte': new Date(notifsUnRead[0].createdAt),
                '$lte': new Date(notifsUnRead[notifsUnRead.length - 1].createdAt)
            }
        }).sort({ createdAt: 'desc' })
        return { count: notifsUnRead.length, notifs: allNotifs }
    } catch (error) {
        throw error
    }
}