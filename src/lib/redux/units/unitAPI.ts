import { request } from "@/lib/api"

export const fetchLoadUnits = async (input: Params) => {
    try {
        const { data } = await request.get('/units', { params: input })
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchGetUnit = async (id: number) => {
    try {
        const { data } = await request.get(`/units/${id}`)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchCreateUnit = async (input: UnitInput) => {
    try {
        const { data } = await request.post('/units', input)
        return data
    } catch (error: any) {
        console.log(error.message)
        throw error
    }
}

export const fetchUpdateUnit = async (id: number, input: UnitInput) => {
    try {
        const { data } = await request.put(`/units/${id}`, input)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchDeleteUnit = async (id: number) => {
    try {
        const { data } = await request.delete(`/units/${id}`)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}