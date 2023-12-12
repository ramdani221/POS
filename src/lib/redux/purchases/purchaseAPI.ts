import { request } from "@/lib/api"

export const fetchLoadPurchases = async (input: Params) => {
    try {
        const { data } = await request.get('/purchases', { params: input })
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchGetPurchase = async (id: number) => {
    try {
        const { data } = await request.get(`/purchases/${id}`)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchCreatePurchase = async (input: PurchaseInput) => {
    try {
        const { data } = await request.post('/purchases', input)
        return data
    } catch (error: any) {
        console.log(error.message)
        throw error
    }
}

export const fetchUpdatePurchase = async (id: number, input: PurchaseInput) => {
    try {
        const { data } = await request.put(`/purchases/${id}`, input)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchDeletePurchase = async (id: number) => {
    try {
        const { data } = await request.delete(`/purchases/${id}`)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}