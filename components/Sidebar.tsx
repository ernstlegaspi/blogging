'use client'

import { signOut } from 'next-auth/react'

const Sidebar = () => {
	return (
		<>
			<br />
			<button onClick={() => signOut()}>Logout</button>
		</>
	)
}

export default Sidebar