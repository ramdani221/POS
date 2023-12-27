import { request } from "@/lib/api"

export const fetchLoadPurchaseitems = async (invoice: number | string) => {
    try {
        const { data } = await request.get('/purchaseitems', { params: {invoice} })
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}
export const fetchCreatePurchaseitem = async (input: PurchaseitemInput) => {
    try {
        const { data } = await request.post('/purchaseitems', input)
        if(data.error) throw data.error
        return data
    } catch (error: any) {
        throw error
    }
}

export const fetchDeletePurchaseitem = async (id: number) => {
    try {
        const { data } = await request.delete(`/purchaseitems/${id}`)
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}