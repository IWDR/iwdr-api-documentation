import { TextField } from '@/components/TextField'
import { Button } from '@/components/Button'
import { useState } from 'react'
import { useAuth } from '@/hooks/auth'

export default function LoginForm() {
  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  })

  const [email, setEmail] = useState('')
  const [email_error, setEmailError] = useState(undefined)
  const [password, setPassword] = useState('')
  const [password_error, setPasswordError] = useState(undefined)

  const submit_form = (e) => {
    e.preventDefault()

    login({
      email,
      password,
      setEmailError,
      setPasswordError,
    })
  }

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
