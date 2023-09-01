import { create } from "zustand";

interface IProps {
	isOpen: boolean
	onClose: () => void
	onOpen: () => void
}

const UseRegisterModal = create<IProps>(set => ({
	isOpen: false,
	onClose: () => set({ isOpen: false }),
	onOpen: () => set({ isOpen: true })
}))

export default UseRegisterModal
