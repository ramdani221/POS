import { request } from "@/lib/api"

export const fetchLoadSales = async (input: Params) => {
    try {
        const { data } = await request.get('/sales', { params: input })
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchGetSale = async (id: number) => {
    try {
        const { data } = await request.get(`/sales/${id}`)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchCreateSale = async (input: SaleInput) => {
    try {
        const { data } = await request.post('/sales', input)
        return data
    } catch (error: any) {
        console.log(error.message)
        throw error
    }
}

export const fetchUpdateSale = async (id: number, input: SaleInput) => {
    try {
        const { data } = await request.put(`/sales/${id}`, input)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchDeleteSale = async (id: number) => {
    try {
        const { data } = await request.delete(`/sales/${id}`)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}