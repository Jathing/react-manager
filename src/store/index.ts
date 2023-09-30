import { User } from '@/types/api.ts'
import { create } from 'zustand'

interface useInfoStore {
  token: string
  userInfo: User.UserItem
  collapsed: boolean
  updateUserInfo: (userInfo: User.UserItem) => void
  updateToken: (token: string) => void
  updateCollapsed: () => void
}

export const useStore = create<useInfoStore>(set => ({
  token: '',
  userInfo: {
    _id: '',
    userId: 0,
    userName: '',
    userEmail: '',
    mobile: '',
    deptId: '',
    deptName: '',
    job: '',
    state: 0,
    role: 0,
    roleList: '',
    createId: 0,
    userImg: ''
  },
  collapsed: false,
  updateUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
  updateToken: (token: string) => set({ token }),
  updateCollapsed: () => set(state => ({ collapsed: !state.collapsed }))
}))
