'use client'
import { TextField } from '@/components/TextField'
import { Button } from '@/components/Button'
import { useState, useEffect } from 'react'
import { useAuthStore } from '@/lib/stores/authStore'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useLoadingStore } from '@/lib/stores/loadingStore'
import { useAlertStore } from '@/lib/stores/alertStore'

const get_csrf_token = async () => {
  let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
    credentials: 'include',
  })

  if (response.status !== 204) {
    // TODO: Create some kind of alert system
  }
}

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [email_error, setEmailError] = useState(undefined)
  const [password, setPassword] = useState('')
  const [password_error, setPasswordError] = useState(undefined)
  const setUser = useAuthStore((state) => state.setUser)
  const { setLoading } = useLoadingStore()
  const { showAlert } = useAlertStore()
  const router = useRouter()

  const submit_form = async (e) => {
    e.preventDefault()

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
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        if (!!data.errors) {
          let err_obj = data.errors
          setEmailError(!!err_obj.email ? err_obj.email[0] : undefined)
          setPasswordError(!!err_obj.password ? err_obj.password[0] : undefined)

          return
        }

        setUser(data.user)

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

  useEffect(() => {
    get_csrf_token()
  }, [])

  return (
    <>
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
