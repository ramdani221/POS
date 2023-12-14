
import db from "@/db/models";
import path from "path";

const models: any = db

export const getGood = async (id: number) => {
    try {
        const data = await models.Good.findOne({
            include: models.Unit,
            where: { id }
        })
        return data
    } catch (error) {
        throw error
    }
}

export const updateGood = async (id: number, input: any) => {
    try {
        const data = await models.Good.update(input, {
            where: {
                id
            },
            returning: true,
            plain: true
        });
        return data
    } catch (error) {
        throw error
    }
}

export const setWriteFile = async (file: any, pathStorage: any) => {
    try {
        const fileName = Date.now() + file.name
        const buffer = Buffer.from(await file.arrayBuffer())
        const filePath = path.join(pathStorage, fileName)
        return { fileName, buffer, filePath }
    } catch (error) {
        throw error
    }
}




