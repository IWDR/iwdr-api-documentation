import { useRouter } from 'next/router'
import axios from '@/lib/axios'
import useSWR from 'swr'
import { useAlertStore } from '@/lib/stores/alertStore'
import { useLoadingStore } from '@/lib/stores/loadingStore'
import { useEffect } from 'react'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter()
  const { showAlert, serverErrorAlert } = useAlertStore()
  const { setLoading } = useLoadingStore()

  const {
    data: user,
    error,
    mutate,
  } = useSWR(`/user-info`, () =>
    axios
      .get('/user-info')
      .then((res) => res.data?.data)
      .catch((error) => {
        if (error.response.status !== 409 && error.response.status !== 401) {
          serverErrorAlert()
          return
        }
      })
  )

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const login = async ({ setEmailError, setPasswordError, ...form }) => {
    // Retrieve CSRF token
    await csrf()

    // Reset errors
    setEmailError(undefined)
    setPasswordError(undefined)

    // Attempt login
    setLoading(true)
    axios
      .post('/login', form)
      .then(() => {
        // Mutate data
        mutate()
        showAlert('You are now signed in.', 'success', true, 6000)
      })
      .catch((error) => {
        // Unknown error
        if (error.response.status !== 422) {
          serverErrorAlert()
          return
        }

        // Capture field errors
        setEmailError(error.response.data?.errors?.email ?? undefined)
        setPasswordError(error.response.data?.errors?.password ?? undefined)
      })
      .finally(() => setLoading(false))
  }

  const logout = async () => {
    // There is no user so do not attempt logout
    if (error) {
      serverErrorAlert()
      return
    }

    // Perform logout
    setLoading(true)
    await axios
      .post('/logout')
      .then(() => {
        mutate()
        showAlert('You are now signed out.', 'success', true, 6000)
      })
      .catch((error) => {
        // Handle error
      })
      .finally(() => {
        // Push router back to index and show log out alert
        router.push('/')
        setLoading(false)
      })
  }

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated)
    }

    if (middleware === 'auth' && error) logout()
  }, [user, error])

  return {
    user,
    login,
    logout,
  }
}
