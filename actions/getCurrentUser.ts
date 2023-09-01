import prisma from '@/prisma'

import getSession from './getSession'

const getCurrentUser = async () => {
	const session = await getSession()

	if(!session?.user?.email) return null

	const currentUser = await prisma.user.findUnique({
		where: {
			email: session?.user?.email as string
		}
	})

	if(!(currentUser)) return null

	return currentUser
}

export default getCurrentUser
