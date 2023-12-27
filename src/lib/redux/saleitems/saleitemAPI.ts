import { request } from "@/lib/api"

export const fetchLoadSaleitems = async (invoice: number | string) => {
    try {
        const { data } = await request.get('/saleitems', { params: { invoice } })
        if (data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}
export const fetchCreateSaleitem = async (input: SaleitemInput) => {
    try {
        const { data } = await request.post('/saleitems', input)
        if (data.error) throw data.error
        return data
    } catch (error: any) {
        throw error
    }
}

export const fetchDeleteSaleitem = async (id: number) => {
    try {
        const { data } = await request.delete(`/saleitems/${id}`)
        if (data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}