import { NextRequest, NextResponse } from "next/server";
import db from "@/db/models";
import fs from 'fs'
import path from "path";
import { getGood, setWriteFile, updateGood } from "@/services/good";

const models: any = db
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = Number(params.id)
    try {
        const data = await getGood(id)
        return NextResponse.json({ data })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id)
        const data = await req.formData();
        const dataGood = JSON.parse(data.get('data') as string)
        const file: any = data.get('image');
        const pathStorage = path.join(process.cwd(), 'public', 'imgGoods')

        if (!file) {
            const result = await updateGood(id, dataGood)
            return NextResponse.json({ data: result[1] })
        }

        const { fileName, buffer, filePath } = await setWriteFile(file, pathStorage)
        
        const good = await getGood(id)
        const rmPath = path.join(pathStorage, good.picture)
        
        if (fs.existsSync(rmPath)) fs.unlinkSync(rmPath)
        
        const result = await updateGood(id, { ...dataGood, picture: fileName })
        fs.writeFileSync(filePath, buffer)

        return NextResponse.json({ data: result[1] })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id
        const good = await models.Good.findOne({ where: { id } });
        const deleteGood = await models.Good.destroy({
            where: { id }
        });
        if (!deleteGood) throw new Error('Failed to Delete Good')
        return NextResponse.json({ data: good })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}