import { request } from "@/lib/api"

export const fetchLoadUnits = async (input: Params) => {
    try {
        const { data } = await request.get('/units', { params: input })
        if (data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchGetUnit = async (id: number) => {
    try {
        const { data } = await request.get(`/units/${id}`)
        if (data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchCreateUnit = async (input: UnitInput) => {
    try {
        const { data } = await request.post('/units', input)
        if (data.error) throw data.error
        return data
    } catch (error: any) {
        throw error
    }
}

export const fetchUpdateUnit = async (id: number, input: UnitInput) => {
    try {
        const { data } = await request.put(`/units/${id}`, input)
        if (data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchDeleteUnit = async (id: number) => {
    try {
        const { data } = await request.delete(`/units/${id}`)
        if (data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}