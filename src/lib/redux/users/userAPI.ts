import { request } from "@/lib/api"

export const fetchLoadUsers = async (input: Params) => {
    try {
        const { data } = await request.get('/users', { params: input })
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchGetUser = async (id: number) => {
    try {
        const { data } = await request.get(`/users/${id}`)
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchCreateUser = async (input: UserInput) => {
    try {
        const { data } = await request.post('/users', input)
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchUpdateUser = async (id: number, input: UserEdit) => {
    try {
        const { data } = await request.put(`/users/${id}`, input)
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchDeleteUser = async (id: number) => {
    try {
        const { data } = await request.delete(`/users/${id}`)
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchChangePassword = async (input: {
    id: number,
    oldPassword: string,
    newPassword: string,
    rePassword: string
}) => {
    try {
        const { data } = await request.put(`/changepassword`, input)
        if(data.error) throw data.error
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}