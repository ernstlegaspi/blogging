import Form from '@/components/form'

import getCurrentUser from '@/actions/getCurrentUser'
import Sidebar from '@/components/Sidebar'


export default async function Home() {
	const currentUser = await getCurrentUser()
	
	if(currentUser) {
		return(
			<>
				{/* Sidebar */}
				{/* Middle Content */}
				Logged in
				<Sidebar />
			</>
		)
	}
	
	return (
		<Form />
	)
}
