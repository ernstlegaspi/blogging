'use client'

interface ModalProps {
	bodyContent?: React.ReactElement
	footerContent?: React.ReactElement
}

const Modal: React.FC<ModalProps> = ({ bodyContent, footerContent }) => {
	return (
		<>
			{bodyContent}
			<div className="my-6 relative flex flex-col items-center">
				<p className="text-center bg-white w-16 relative z-10">or</p>
				<div className="absolute main-color w-full h-[1px] top-[50%]"></div>
			</div>
			{footerContent}
		</>
	)
}

export default Modal