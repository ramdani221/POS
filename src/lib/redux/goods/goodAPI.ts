import { request } from "@/lib/api"

export const fetchLoadGoods = async (input: Params) => {
    try {
        const { data } = await request.get('/goods', { params: input })
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchGetGood = async (id: number | string) => {
    try {
        const { data } = await request.get(`/goods/${id}`)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchCreateGood = async (input: FormDataEntryValue) => {
    try {
        const { data } = await request.post('/goods', input)
        return data
    } catch (error: any) {
        console.log(error.message)
        throw error
    }
}

export const fetchUpdateGood = async (id: number, input: FormDataEntryValue) => {
    try {
        const { data } = await request.put(`/goods/${id}`, input)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchDeleteGood = async (id: number | string) => {
    try {
        const { data } = await request.delete(`/goods/${id}`)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}