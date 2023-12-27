import { request } from "@/lib/api"

export const fetchLoadCustomers = async (input: Params) => {
    try {
        const { data } = await request.get('/customers', { params: input })
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchGetCustomer = async (id: number) => {
    try {
        const { data } = await request.get(`/customers/${id}`)
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchCreateCustomer = async (input: CustomerInput) => {
    try {
        const { data } = await request.post('/customers', input)
        if(data.error) throw data.error
        return data
    } catch (error: any) {
        throw error
    }
}

export const fetchUpdateCustomer = async (id: number, input: CustomerInput) => {
    try {
        const { data } = await request.put(`/customers/${id}`, input)
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchDeleteCustomer = async (id: number) => {
    try {
        const { data } = await request.delete(`/customers/${id}`)
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}