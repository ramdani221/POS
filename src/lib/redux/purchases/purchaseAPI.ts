import { request } from "@/lib/api"

export const fetchLoadPurchases = async (input: Params) => {
    try {
        const { data } = await request.get('/purchases', { params: input })
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchGetPurchase = async (id: number) => {
    try {
        const { data } = await request.get(`/purchases/${id}`)
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchCreatePurchase = async (input: PurchaseInput) => {
    try {
        const { data } = await request.post('/purchases', input)
        if(data.error) throw data.error
        return data
    } catch (error: any) {
        throw error
    }
}

export const fetchUpdatePurchase = async (id: number, input: PurchaseInput) => {
    try {
        const { data } = await request.put(`/purchases/${id}`, input)
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchDeletePurchase = async (id: number) => {
    try {
        const { data } = await request.delete(`/purchases/${id}`)
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}