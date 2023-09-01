import { create } from "zustand";

interface IProps {
	isOpen: boolean
	onClose: () => void
	onOpen: () => void
}

const UseLoginModal = create<IProps>(set => ({
	isOpen: true,
	onClose: () => set({ isOpen: false }),
	onOpen: () => set({ isOpen: true })
}))

export default UseLoginModal
