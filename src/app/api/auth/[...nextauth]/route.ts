import { dataUser, login } from "@/lib/auth/auth"
import type { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"


const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'domain-login',
            name: 'POS Account',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Enter Email' },
                password: { label: 'Password', type: 'password', placeholder: 'pasword' }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null
                try {
                    const user = await login(credentials.email, credentials.password)
                    return user
                } catch (error: any) {
                    console.log(error.message)
                    return null
                }
            },
        })
    ],
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/signIn'
    },
    callbacks: {
        async session({ session }: { session: any }) {
            if (!session) return null;
            try {
                const data = await dataUser(session.user.email)
                return {...session, user: {...session.user, role: data.role, id: data.id}}
            } catch (error) {
                return null
            }

        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }