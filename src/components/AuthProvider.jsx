import { createContext } from 'react'

export const AuthContext = createContext()
export function AuthProvider({ user, children }) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
