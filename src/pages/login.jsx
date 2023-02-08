import { TextField } from '@/components/TextField'
import { Button } from '@/components/Button'
import { useState } from 'react'
import { useAuthStore } from '@/lib/stores/authStore'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useLoadingStore } from '@/lib/stores/loadingStore'
import { useAlertStore } from '@/lib/stores/alertStore'

export async function getServerSideProps() {
  return {
    props: {
      title: 'Sign In',
    },
  }
}

export default function Login(props) {
  const [email, setEmail] = useState('')
  const [email_error, setEmailError] = useState(undefined)
  const [password, setPassword] = useState('')
  const [password_error, setPasswordError] = useState(undefined)
  const { setLoading } = useLoadingStore()
  const { showAlert } = useAlertStore()
  const setUser = useAuthStore((state) => state.setUser)
  const router = useRouter()

  const server_error_alert = () =>
    showAlert(
      'There was an issue proccessing your request. Please try again later.',
      'error',
      true,
      6000
    )

  const get_csrf_token = async () => {
    // Get the CSRF Token from api server
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`,
      {
        credentials: 'include',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json',
        },
      }
    )

    if (!response.ok) {
      server_error_alert()
      return false
    }

    return true
  }

  const submit_form = async (e) => {
    e.preventDefault()

    let has_token = await get_csrf_token()

    if (!has_token) return

    // Get possible redirects
    const queryParams = new URLSearchParams(window.location.search)
    const redirect = queryParams.get('redirect') ?? false

    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok && response.status !== 422) {
          server_error_alert()

          return null
        }

        return response.json()
      })
      .then((data) => {
        setLoading(false)
        if (!!data.errors) {
          let err_obj = data.errors
          setEmailError(!!err_obj.email ? err_obj.email[0] : undefined)
          setPasswordError(!!err_obj.password ? err_obj.password[0] : undefined)

          return
        }

        setUser(data.data)

        if (!redirect) {
          router.push('/')
        } else {
          router.push(`/${redirect}`)
        }

        showAlert('You are now signed in.', 'success', true, 4000)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <h1>{props.title}</h1>
      <p>Access user restricted pages and content.</p>
      <form className="my-6" onSubmit={(e) => submit_form(e)}>
        <div>
          <TextField
            type="email"
            label="Email"
            placeholder="Enter your email..."
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            error={!!email_error}
            error_message={email_error}
          />
        </div>
        <div className="mt-4">
          <TextField
            type="password"
            label="Password"
            placeholder="Enter your account password..."
            name="password"
            id="password"
            className="mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!password_error}
            error_message={password_error}
          />
        </div>
        <div className="mt-6">
          <Button type="submit">Sign in</Button>
        </div>
      </form>
    </>
  )
}
