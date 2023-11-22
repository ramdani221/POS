import db from "@/db/models";

const model: any = db

export async function login(email: string, password: string) {
        const user = await model.User.findOne({ where: { email } })
        if (!user) throw new Error('email or password is wrong!')
        if (!user.checkPassword(password)) throw new Error('email or password is wrong!')
        return user
}