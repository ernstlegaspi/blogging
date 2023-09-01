'use client'

import Image from 'next/image'

import LoginModal from './modals/loginModal'
import RegisterModal from './modals/registerModal'

const Form = () => {
	return (
		<div className="flex items-center justify-center h-full">
			<div className="rounded-lg form-shadow bg-white w-[70%] h-3/4 flex">
				<div className="bg-[url('/img/bg.jpg')] w-[50%] h-full rounded-l-lg flex flex-col items-center">
					<div className="w-full h-full black-transparent rounded-l-lg flex items-center justify-center">
						<p className="font-bold text-[40px] text-white w-[70%] text-center m-auto italic">Unveil Your Thoughts, One Post at a Time.</p>
					</div>
				</div>
				<div className="relative h-full w-[50%]">
					<div className="overflow-hidden relative h-full w-[75%] mx-auto">
						<div className="w-full flex justify-center">
							<Image className="" src="/img/logo.png" alt="Logo Background" width={200} height={200} />
						</div>
						<RegisterModal />
						<LoginModal />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Form