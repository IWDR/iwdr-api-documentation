import { Button } from '@/components/Button'
import { useAuth } from '@/hooks/auth'

export default function SignInOutButton({ className }) {
  const { user, logout } = useAuth()

  if (user) {
    return (
      <Button onClick={logout} className={className}>
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
