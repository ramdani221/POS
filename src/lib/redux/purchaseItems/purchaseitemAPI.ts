import { request } from "@/lib/api"

export const fetchLoadPurchaseitems = async (invoice: number | string) => {
    try {
        const { data } = await request.get('/purchaseitems', { params: {invoice} })
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const fetchCreatePurchaseitem = async (input: PurchaseitemInput) => {
    try {
        const { data } = await request.post('/purchaseitems', input)
        return data
    } catch (error: any) {
        console.log(error.message)
        throw error
    }
}

export const fetchDeletePurchaseitem = async (id: number) => {
    try {
        const { data } = await request.delete(`/purchaseitems/${id}`)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}