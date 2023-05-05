import { create } from 'zustand'

type State = {
  isOpen: boolean
  post: any

}
type Action = {
  setOpen: (postId: string) => void
  setClose: () => void
  toggleModal: () => void
}
export const useCommentsStore = create<State & Action>((set) => ({
  isOpen: false,
  post: null,
  toggleModal: () => set(state => ({ isOpen: !state.isOpen })),
  setOpen: (post) => set({ isOpen: true, post }),
  setClose: () => set({ isOpen: false })

}))