import { NextRequest, NextResponse } from "next/server";
import db from "@/db/sequelize/models";
import { deletePurchaseItem } from "@/services/model";

const models: any = db

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id)
        const deleteItem = await deletePurchaseItem(id)
        if (!deleteItem) throw new Error('Failed to Delete Purchaseitem')
        return NextResponse.json({ data: deleteItem })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}