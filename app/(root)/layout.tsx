import '../globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Blogging is where you post your blogs.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Toaster />
				{children}
			</body>
		</html>
	)
}
