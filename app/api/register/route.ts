import bcrypt from 'bcrypt'
import prisma from '@/prisma'

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const body = await request.json()

		const { firstName, lastName, email, password } = body

		if(!firstName || !lastName || !email || !password) return new NextResponse('Internal Error', { status: 500 })

		const hashedPassword = await bcrypt.hash(password, 12)

		if(!hashedPassword) return new NextResponse('Internal Error', { status: 500 })
		
		const newUser = await prisma.user.create({
			data: {
				firstName,
				lastName,
				email,
				hashedPassword
			}
		})

		return NextResponse.json(newUser)
	}
	catch(error: any) {
		return new NextResponse('Internal Error', { status: 500 })
	}
}
