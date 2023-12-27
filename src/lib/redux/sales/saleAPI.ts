import { request } from "@/lib/api"

export const fetchLoadSales = async (input: Params) => {
    try {
        const { data } = await request.get('/sales', { params: input })
        if (data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchGetSale = async (id: number) => {
    try {
        const { data } = await request.get(`/sales/${id}`)
        if (data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchCreateSale = async (input: SaleInput) => {
    try {
        const { data } = await request.post('/sales', input)
        if (data.error) throw data.error
        return data
    } catch (error: any) {
        throw error
    }
}

export const fetchUpdateSale = async (id: number, input: SaleInput) => {
    try {
        const { data } = await request.put(`/sales/${id}`, input)
        if (data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchDeleteSale = async (id: number) => {
    try {
        const { data } = await request.delete(`/sales/${id}`)
        if (data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}