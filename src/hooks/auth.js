import axios from '@/lib/axios'
import useSWR from 'swr'
import { useAlertStore } from '@/stores/alertStore'
import { useLoadingStore } from '@/stores/loadingStore'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter()
  const { showAlert, serverErrorAlert } = useAlertStore()

  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    `/user-info`,
    () => axios.get('/user-info').then((res) => res.data?.data),
    {
      fallbackData: null,
    }
  )

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const login = async ({ setErrors, setLoading, redirect, ...form }) => {
    // Retrieve CSRF token
    await csrf()

    // Reset errors
    setErrors({ email: null, password: null })

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
        console.log(error)
        // Unknown error
        if (error.response?.status !== 422) {
          serverErrorAlert()
          return
        }

        // Capture field errors
        setErrors(
          error.response?.data?.errors ?? { email: null, password: null }
        )
      })
      .finally(() => setLoading(false))
  }

  const logout = async ({ setLoading }) => {
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
        mutate(null)
        // Push back to index and show log out alert
        router.push('/')
        showAlert('You are now signed out.', 'success', true, 6000)
      })
      .catch(() => serverErrorAlert())
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && !error) {
      let hrefURL = new URL(
        `${process.env.NEXT_PUBLIC_APP_URL}${redirectIfAuthenticated}`
      )
      let pageURL = new URL(window.location)

      if (
        redirectIfAuthenticated.startsWith('/') ||
        hrefURL.host === pageURL.host
      ) {
        router.push(hrefURL)
      } else {
        router.push('/')
      }
    }
  }, [user, error])

  return {
    user,
    login,
    logout,
  }
}
