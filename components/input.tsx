'use client'

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
	fullWidth?: boolean
	id: string
	placeholder: string
	register: UseFormRegister<FieldValues>
	required: boolean
	type?: string
	disabled?: boolean
	marginLeft?: boolean
	errors: FieldErrors
}

const input: React.FC<InputProps> = ({ errors, marginLeft, disabled, fullWidth, id, placeholder, register, required, type = "text" }) => {
	return (
		<input disabled={disabled} id={id} placeholder={placeholder} { ...register(id, { required }) } type={type}
			className={`${errors[id] ? 'bg-rose-200' : 'bg-transparent'} ${marginLeft ? 'ml-5' : ''} mb-7 outline-none border-b ${errors[id] ? 'border-rose-800' : 'border-main-color'} pl-2 py-2 ${fullWidth ? 'w-full' : ''}`}
		/>
	)
}

export default input