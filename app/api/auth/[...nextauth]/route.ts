import bcrypt from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '@/prisma'

import NextAuth, { AuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID as string,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
		}),
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' }
			},
			async authorize(credentials) {
				if(!credentials) throw new Error('Invalid Credentials')

				if(!credentials.email) throw new Error('Invalid email')
				
				if(!credentials.password) throw new Error('Invalid password')

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email
					}
				})

				if(!user || !user?.hashedPassword) throw new Error('Invalid User credentials')

				const hashedPassword = bcrypt.compare(user.hashedPassword, credentials.password)

				if(!hashedPassword) throw new Error('Password does not match')

				return user
			}
		})
	],
	pages: {
		signIn: '/'
	},
	debug: process.env.NODE_ENV === 'development',
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
