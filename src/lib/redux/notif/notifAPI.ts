import { request } from "@/lib/api"

export const fetchLoadNotifs = async () => {
    try {
        const { data } = await request.get('/notification')
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}