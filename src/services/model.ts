import db from "@/db/models";
import { Op } from "sequelize";

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
        const purchaseitems = await models.Purchaseitem.findAll({ where: { invoice: purchaseId } })
        purchaseitems.forEach(async (item: any) => {
            await models.Good.decrement('stock', { by: item.quantity, where: { id: item.itemcode } })
        });
    } catch (error) {
        throw error
    }
}

export async function deletePurchaseItem(id: number | string) {
    try {
        const purchaseitem = await models.Purchaseitem.findOne({ where: { id } })
        await models.Good.decrement('stock', { by: purchaseitem.quantity, where: { id: purchaseitem.itemcode } })
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
            // await models.Purchaseitem.update({totalprice: Number(findPurchaseitem.totalprice) + Number(input.totalprice)})
            await findPurchaseitem.increment('totalprice', {by: input.totalprice})
            const purchaseitem = await findPurchaseitem.increment('quantity', { by: input.quantity });
            await models.Good.increment('stock', { by: input.quantity, where: { id: input.itemcode } });
            return purchaseitem
        }
        const newPurchaseitem = await models.Purchaseitem.create(input);
        const purchaseitem = await models.Purchaseitem.findOne({where: {id: newPurchaseitem.id}, include: models.Good})
        models.Good.increment('stock', { by: input.quantity, where: { id: input.itemcode } });
        return purchaseitem
    } catch (error) {
        throw error
    }
}