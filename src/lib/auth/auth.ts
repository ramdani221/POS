import db from "@/db/models";

const models: any = db

export async function login(email: string, password: string) {
        const user = await models.User.scope(null).findOne({ where: { email } })
        if (!user) throw new Error('email or password is wrong!')
        if (!user.checkPassword(password)) throw new Error('email or password is wrong!')
        return user
}

export async function dataUser(email: string) {
        const data = await models.User.findOne({ where: { email } })
        if(!data) throw new Error('User not Found')
        return data
}