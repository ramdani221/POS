import { request } from "@/lib/api"

export const fetchLoadGoods = async (input: Params) => {
    try {
        const { data } = await request.get('/goods', { params: input })
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchGetGood = async (id: number | string) => {
    try {
        const { data } = await request.get(`/goods/${id}`)
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchCreateGood = async (input: FormDataEntryValue) => {
    try {
        const { data } = await request.post('/goods', input)
        if(data.error) throw data.error
        return data
    } catch (error: any) {
        throw error
    }
}

export const fetchUpdateGood = async (id: number, input: FormDataEntryValue) => {
    try {
        const { data } = await request.put(`/goods/${id}`, input)
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchDeleteGood = async (id: number | string) => {
    try {
        const { data } = await request.delete(`/goods/${id}`)
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}