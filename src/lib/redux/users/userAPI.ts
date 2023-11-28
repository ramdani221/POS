import { request } from "@/lib/api"

export const fetchLoadUsers = async (input: UserParams) => {
    try {
        const {data} = await request.get('/users', {params: input})
        return data
    } catch (error) {
        console.log(error)
    }
}

export const fetchGetUser = async (id:string) => {
    try {
        const {data} = await request.get(`/users/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const fetchCreateUser = async (input: UserInput) => {
    try {
        const {data} = await request.post('/users', input)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const fetchUpdateUser = async (id: number, input: UserEdit) => {
    try {
        const {data} = await request.put(`/users/${id}`, input)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const fetchDeleteUser = async (id: number) => {
    try {
        const {data} = await request.delete(`/users/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
}