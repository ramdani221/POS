import { login } from "@/lib/auth/auth"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
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
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }