'use client'

import { useState } from 'react'
import { AiFillFacebook, AiOutlineGoogle } from 'react-icons/ai'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

import axios from 'axios'

import Modal from './modal'
import Button from '../Button'
import Input from '../input'
import UseLoginModal from '@/hooks/useLoginModal'
import UseRegisterModal from '@/hooks/useRegisterModal'

const RegisterModal = () => {
	const [disabled, setDisabled] = useState(false)
	const router = useRouter()
	const useLoginModal = UseLoginModal()
	const useRegisterModal = UseRegisterModal()
	
	const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const changeModal = () => {
		useLoginModal.onOpen()
		useRegisterModal.onClose()
	}
	
	const bodyContent = (
		<>
			<div className="flex justify-between">
				<Input errors={errors} disabled={disabled} fullWidth id="firstName" placeholder="First Name" register={register} required />
				<Input errors={errors} disabled={disabled} fullWidth marginLeft id="lastName" placeholder="Last Name" register={register} required />
			</div>
			<Input errors={errors} disabled={disabled} fullWidth id="email" placeholder="Email" register={register} required type="email" />
			<Input errors={errors} disabled={disabled} fullWidth id="password" placeholder="Password" register={register} required type="password" />
			<Button disabled={disabled} isSubmit label="Register" fullWidth />
			<p className="mt-2 text-[14px]">Already have an account? <span onClick={changeModal} className="hover:text-emerald-900 underline cursor-pointer italic">Login here</span></p>
		</>
	)

	const footerContent = (
		<>
			<Button disabled={disabled} icon={AiFillFacebook} onClick={() => {}} label="Register with Facebook" fullWidth />
			<Button disabled={disabled} icon={AiOutlineGoogle} onClick={() => {}} label="Register with Google" fullWidth />
		</>
	)

	if(!useRegisterModal.isOpen) return null

	const onSubmit: SubmitHandler<FieldValues> = data => {
		axios.post(`/api/register`, data)
		.then(() => setDisabled(true))
		.catch(error => {
			toast.error(`Error register ${error}`)
		})
		.finally(() => {
			toast.success('Register successful')
			setDisabled(false)
			router.refresh()
			setValue('firstName', '')
			setValue('lastName', '')
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

export default RegisterModal