import { request } from "@/lib/api"

export const fetchLoadSaleitems = async (invoice: number | string) => {
    try {
        const { data } = await request.get('/saleitems', { params: {invoice} })
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const fetchCreateSaleitem = async (input: SaleitemInput) => {
    try {
        const { data } = await request.post('/saleitems', input)
        return data
    } catch (error: any) {
        console.log(error.message)
        throw error
    }
}

export const fetchDeleteSaleitem = async (id: number) => {
    try {
        const { data } = await request.delete(`/saleitems/${id}`)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}