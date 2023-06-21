import { TComment, TGoogleUser } from '@/types'
import { create } from 'zustand'

type State = {
  currentUser: {
    name: string
    email: string
    username: string
    userImg: string
    uid: string
    timestamp?: string
  }
  isOpen: boolean
  setIsOpen: () => void
  setClose: () => void
  toggleModal: () => void
}
export const initialState = { name: '', email: '', username: '', userImg: '', uid: '', timestamp: '' }
type Action = {
  setCurrentUser: (user: TGoogleUser) => void
}
export const useUserStore = create<State & Action>((set) => ({
  currentUser: initialState,
  isOpen: false,
  setIsOpen: () => set(state => ({ ...state, isOpen: true })),
  toggleModal: () => set(state => ({ isOpen: !state.isOpen })),
  setClose: () => set({ isOpen: false }),
  setCurrentUser: (user) => set(state => ({
    ...state,
    currentUser: {
      name: user.displayName!,
      email: user.email!,
      username: user.displayName!.split(' ').join('').toLocaleLowerCase(),
      userImg: user.photoURL!,
      uid: user.uid!,
    }
  }))


}))