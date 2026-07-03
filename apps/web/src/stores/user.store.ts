import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { User } from '@adp-studio/types'

interface UserState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'UserStore' }
  )
)
