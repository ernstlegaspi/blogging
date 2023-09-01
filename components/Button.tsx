'use client'

import { IconType } from "react-icons"
import { motion } from 'framer-motion'

interface ButtonProps {
	onClick?: () => void
	icon?: IconType
	label: string
	fullWidth?: boolean
	disabled?: boolean
	isSubmit?: boolean
}

const Button: React.FC<ButtonProps> = ({ isSubmit, disabled, onClick, icon: Icon, label, fullWidth }) => {
	return (
		<motion.button type={isSubmit ? 'submit' : 'button'} disabled={disabled} whileHover={{ scale: 1.01 }} onClick={onClick} className={`transition-all ${disabled ? '' : 'hover:bg-emerald-950'} flex justify-center items-center ${disabled ? 'bg-red-500' : 'main-color'} text-white rounded-[4px] py-2 ${fullWidth ? 'w-full' : ''} mb-6`}>
			{label}
			{Icon && (
				<div className="">
					<Icon className="ml-2" size={20} />
				</div>
			)} 
		</motion.button>
	)
}

export default Button
