import { createStore } from 'zustand/vanilla'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { createContext, useContext } from 'react'
import { useStore } from 'zustand'

export const authStore = createStore(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        setUser: (user) => {
          set({ user: user })
        },
      }),
      {
        name: 'auth-storage',
        stoage: createJSONStorage(() => sessionStorage),
      }
    )
  )
)

export const AuthContext = createContext()
export const AuthProvider = AuthContext.Provider

export function useAuthStore(selector) {
  let store = useContext(AuthContext)
  return useStore(store, selector)
}
