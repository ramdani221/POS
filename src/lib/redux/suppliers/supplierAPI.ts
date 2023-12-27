import { request } from "@/lib/api"

export const fetchLoadSuppliers = async (input: Params) => {
    try {
        const { data } = await request.get('/suppliers', { params: input })
        if (data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchGetSupplier = async (id: number) => {
    try {
        const { data } = await request.get(`/suppliers/${id}`)
        if (data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchCreateSupplier = async (input: SupplierInput) => {
    try {
        const { data } = await request.post('/suppliers', input)
        if (data.error) throw data.error
        return data
    } catch (error: any) {
        throw error
    }
}

export const fetchUpdateSupplier = async (id: number, input: SupplierInput) => {
    try {
        const { data } = await request.put(`/suppliers/${id}`, input)
        if (data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchDeleteSupplier = async (id: number) => {
    try {
        const { data } = await request.delete(`/suppliers/${id}`)
        if (data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}