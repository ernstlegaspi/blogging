'use client'

import { FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
	fullWidth?: boolean
	id: string
	placeholder: string
	register: UseFormRegister<FieldValues>
	required: boolean
	type?: string
	disabled?: boolean
	marginLeft?: boolean
}

const input: React.FC<InputProps> = ({ marginLeft, disabled, fullWidth, id, placeholder, register, required, type = "text" }) => {
	return (
		<input disabled={disabled} className={`${marginLeft ? 'ml-5' : ''} bg-transparent' mb-7 outline-none border-b border-main-color py-2 ${fullWidth ? 'w-full' : ''}`} id={id} placeholder={placeholder} { ...register(id, { required }) } type={type} />
	)
}

export default input