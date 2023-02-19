import { TextField } from '@/components/TextField'
import { Button } from '@/components/Button'
import { useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { useLoadingStore } from '@/stores/loadingStore'

export default function LoginForm({ redirect }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: null, password: null })
  const { setLoading } = useLoadingStore()

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: redirect ?? '/',
  })

  const submit_form = async (e) => {
    e.preventDefault()

    login({ setErrors, setLoading, ...{ email, password } })
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
            error={!!errors.email}
            error_message={errors.email}
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
            error={!!errors.password}
            error_message={errors.password}
          />
        </div>
        <div className="mt-6">
          <Button type="submit">Sign in</Button>
        </div>
      </form>
    </>
  )
}
