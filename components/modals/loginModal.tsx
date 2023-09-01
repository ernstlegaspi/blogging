'use client'

import { AiFillFacebook, AiOutlineGoogle } from 'react-icons/ai'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

import Modal from './modal'
import Button from '../Button'
import Input from '../input'
import UseLoginModal from '@/hooks/useLoginModal'
import UseRegisterModal from '@/hooks/useRegisterModal'

interface LoginModalProps {
	isOpen?: boolean
}

const LoginModal: React.FC<LoginModalProps> = () => {
	const useLoginModal = UseLoginModal()
	const useRegisterModal = UseRegisterModal()
	
	const { register, handleSubmit } = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: ''
		}
	})
	
	const changeModal = () => {
		useLoginModal.onClose()
		useRegisterModal.onOpen()
	}

	const bodyContent = (
		<>
			<Input fullWidth id="email" placeholder="Email" register={register} required type="email" />
			<Input fullWidth id="password" placeholder="Password" register={register} required type="password" />
			<Button onClick={() => {}} label="Login" fullWidth />
			<p className="mt-2 text-[14px]">Don't have an account? <span onClick={changeModal} className="hover:text-emerald-900 underline cursor-pointer italic">Register here</span></p>
		</>
	)

	const footerContent = (
		<>
			<Button icon={AiFillFacebook} onClick={() => {}} label="Login with Facebook" fullWidth />
			<Button icon={AiOutlineGoogle} onClick={() => {}} label="Login with Google" fullWidth />
		</>
	)

	if(!useLoginModal.isOpen) return null
	
	return (
		<motion.div className="absolute w-full" transition={{ type: "spring", damping: 10, stiffness: 150 }} initial={{ y: '-100vh' }} animate={{ y: '0'}} exit={{ y: '0' }}>
			<Modal bodyContent={bodyContent} footerContent={footerContent} />
		</motion.div>
	)
}

export default LoginModal