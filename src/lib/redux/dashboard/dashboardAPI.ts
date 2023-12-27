import { request } from "@/lib/api"

export const fetchLoadDashboard = async (input: ParamsDashboard) => {
    try {
        const { data } = await request.get('/dashboard', { params: input })
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}