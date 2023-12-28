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
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Enter Email'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'pasword'
                }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null
                try {
                    const user = await login(credentials.email, credentials.password)
                    return user
                } catch (error: any) {
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
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update" && session?.name) {
                token.name = session?.name
                token.email = session?.email
            }
            return token
        },
        async session({ session }) {
            try {
                const data = await dataUser(session?.user?.email as string)
                return {
                    ...session,
                    user: {
                        ...session.user,
                        role: data.role,
                        id: data.id
                    }
                }
            } catch (error) {
                return session
            }
        },
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }