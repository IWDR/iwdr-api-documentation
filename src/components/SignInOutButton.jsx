import { Button } from '@/components/Button'
import { useAuth } from '@/hooks/auth'

export default function SignInOutButton({ className, user }) {
  const { logout } = useAuth()

  if (Object.keys(user).length > 0) {
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
