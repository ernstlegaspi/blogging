'use client'

import { AiFillFacebook, AiOutlineGoogle } from 'react-icons/ai'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import Modal from './modal'
import Button from '../Button'
import Input from '../input'
import UseLoginModal from '@/hooks/useLoginModal'
import UseRegisterModal from '@/hooks/useRegisterModal'

interface LoginModalProps {
	isOpen?: boolean
}

const LoginModal: React.FC<LoginModalProps> = () => {
	const [disabled, setDisabled] = useState(false)
	const router = useRouter()
	const useLoginModal = UseLoginModal()
	const useRegisterModal = UseRegisterModal()
	
	const { register, handleSubmit, formState: { errors }, setValue } = useForm<FieldValues>({
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
			<Input errors={errors} fullWidth id="email" placeholder="Email" register={register} required type="email" />
			<Input errors={errors} fullWidth id="password" placeholder="Password" register={register} required type="password" />
			<Button disabled={disabled} isSubmit label="Register" fullWidth />
			<p className="mt-2 text-[14px]">Don't have an account? <span onClick={changeModal} className="hover:text-emerald-900 underline cursor-pointer italic">Register here</span></p>
		</>
	)

	const footerContent = (
		<>
			<Button icon={AiFillFacebook} onClick={() => signIn('facebook')} label="Login with Facebook" fullWidth />
			<Button icon={AiOutlineGoogle} onClick={() => signIn('google')} label="Login with Google" fullWidth />
		</>
	)

	if(!useLoginModal.isOpen) return null
	
	const onSubmit: SubmitHandler<FieldValues> = data => {
		signIn('credentials', { ...data, redirect: false })
		.then(() => setDisabled(true))
		.catch(error => {
			toast.error(`Error Logging in ${error}`)
		})
		.finally(() => {
			toast.success('Login successful')
			setDisabled(false)
			router.refresh()
			setValue('email', '')
			setValue('password', '')
		})
	}

	return (
		<motion.div className="absolute w-full" transition={{ type: "spring", damping: 10, stiffness: 150 }} initial={{ y: '-100vh' }} animate={{ y: '0'}} exit={{ y: '0' }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Modal bodyContent={bodyContent} footerContent={footerContent} />
			</form>
		</motion.div>
	)
}

export default LoginModal