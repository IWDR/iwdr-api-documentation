import { useAuthStore } from '@/lib/stores/authStore'
import { Button } from '@/components/Button'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useLoadingStore } from '@/lib/stores/loadingStore'
import clsx from 'clsx'
import { useAlertStore } from '@/lib/stores/alertStore'

export default function SignInOutButton({ className }) {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

  const { showAlert } = useAlertStore()
  const { setLoading } = useLoadingStore()
  const router = useRouter()

  const logout = () => {
    setLoading(true)
    fetch(`${process.env.API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((res) => {
        if (res.status !== 204) {
          // TODO: Create some kind of alert system
        }

        setLoading(false)
        setUser(null)
        router.push('/')
      })
      .finally(() => {
        showAlert('You are now signed out.', 'success', true, 4000)
      })
  }

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
