import { Button } from '@/components/Button'
import { useAuth } from '@/hooks/auth'
import { useLoadingStore } from '@/stores/loadingStore'
import { useContext } from 'react'
import { AuthContext } from './AuthProvider'

export default function SignInOutButton({ className }) {
  const { logout } = useAuth()
  const user = useContext(AuthContext)
  const { setLoading } = useLoadingStore()

  if (user) {
    return (
      <Button onClick={() => logout({ setLoading })} className={className}>
        Sign out
      </Button>
    )
  }

  return (
    <Button href="/login" className={className}>
      Sign in
    </Button>
  )
}
