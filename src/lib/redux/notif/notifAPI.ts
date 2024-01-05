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

export const fetchCreateNotif = async (input: NotifInput) => {
    try {
        const { data } = await request.post('/notification', input)
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchUpdateNotif = async (id: string) => {
    try {
        const { data } = await request.put(`/notification/${id}`, {isRead: true})
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}