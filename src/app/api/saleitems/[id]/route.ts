import { NextRequest, NextResponse } from "next/server";
import db from "@/db/models";
import { deleteSaleItem } from "@/services/model";

const models: any = db

export async function DELETE(req: NextRequest, {params} : {params : {id: string}}) {
    try {
        const id = Number(params.id)
        const deleteItem = await deleteSaleItem(id)
        if (!deleteItem) throw new Error('Failed to Delete Saleitem')
        return NextResponse.json({ data: deleteItem })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}