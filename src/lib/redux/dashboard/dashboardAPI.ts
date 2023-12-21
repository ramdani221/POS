import { request } from "@/lib/api"

export const fetchLoadDashboard = async (input: ParamsDashboard) => {
    try {
        const { data } = await request.get('/dashboard', { params: input })
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}