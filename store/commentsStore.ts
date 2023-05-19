import { TComment } from '@/types'
import { create } from 'zustand'

type State = {
  isOpen: boolean
  post: any
  comment: TComment
  postComments: { [key: string]: TComment[] }

}
type Action = {
  setOpen: (postId: string) => void
  setComment: (data: TComment) => void
  setClose: () => void
  toggleModal: () => void
  setPostComments: (data: any) => void
}
export const useCommentsStore = create<State & Action>((set) => ({
  isOpen: false,
  post: null,
  comment: { text: '', name: '', username: '', userImage: '', timestamp: 0, uid: '', postId: '' },
  postComments: {},
  setPostComments: (data) => set(state => ({ ...state, postComments: { ...data } })),
  setComment: (data) => set(state => ({ ...state, comment: { ...data } })),
  toggleModal: () => set(state => ({ isOpen: !state.isOpen })),
  setOpen: (post) => set({ isOpen: true, post }),
  setClose: () => set({ isOpen: false })

}))