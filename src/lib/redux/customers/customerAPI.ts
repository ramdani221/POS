import { request } from "@/lib/api"

export const fetchLoadCustomers = async (input: Params) => {
    try {
        const { data } = await request.get('/customers', { params: input })
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchGetCustomer = async (id: number) => {
    try {
        const { data } = await request.get(`/customers/${id}`)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchCreateCustomer = async (input: CustomerInput) => {
    try {
        const { data } = await request.post('/customers', input)
        return data
    } catch (error: any) {
        console.log(error.message)
        throw error
    }
}

export const fetchUpdateCustomer = async (id: number, input: CustomerInput) => {
    try {
        const { data } = await request.put(`/customers/${id}`, input)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchDeleteCustomer = async (id: number) => {
    try {
        const { data } = await request.delete(`/customers/${id}`)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}