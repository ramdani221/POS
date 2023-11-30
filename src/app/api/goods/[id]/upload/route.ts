import { NextRequest, NextResponse } from "next/server";
import db from "@/db/models";
import fs from "fs"
import path from "path";

const models: any = db

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id)
        const data = await req.formData()
        const file: any = data.get('image')

        if (!file) throw new Error('No files were Uploaded')

        const fileName = Date.now() + file.name
        const buffer = Buffer.from(await file.arrayBuffer())
        const filePath = path.join(process.cwd(), 'public', 'imgItem', fileName)

        const good = await models.Good.findOne({
            where: { id }
        })
        console.log(good.picture.length)
        if (good.picture.length > 0) {
            const rmPath = path.join(process.cwd(), 'public', 'imgItem', good.picture)
            try {
                fs.unlinkSync(rmPath)
            } catch {
                try {
                    const result = await models.Good.update({ picture: fileName }, {
                        where: {
                            id
                        },
                        returning: true,
                        plain: true
                    });

                    fs.writeFileSync(filePath, buffer)
                    
                    return NextResponse.json({ data: result[1] })
                } catch (error) {
                    console.log(error)
                    throw error
                }                
            }
        }

        const result = await models.Good.update({ picture: fileName }, {
            where: {
                id
            },
            returning: true,
            plain: true
        });

        fs.writeFileSync(filePath, buffer)
        
        return NextResponse.json({ data: result[1] })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}