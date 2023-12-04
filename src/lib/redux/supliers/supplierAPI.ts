import { request } from "@/lib/api"

export const fetchLoadSuppliers = async (input: Params) => {
    try {
        const { data } = await request.get('/suppliers', { params: input })
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchGetSupplier = async (id: number) => {
    try {
        const { data } = await request.get(`/suppliers/${id}`)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchCreateSupplier = async (input: SupplierInput) => {
    try {
        const { data } = await request.post('/suppliers', input)
        return data
    } catch (error: any) {
        console.log(error.message)
        throw error
    }
}

export const fetchUpdateSupplier = async (id: number, input: SupplierInput) => {
    try {
        const { data } = await request.put(`/suppliers/${id}`, input)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchDeleteSupplier = async (id: number) => {
    try {
        const { data } = await request.delete(`/suppliers/${id}`)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}