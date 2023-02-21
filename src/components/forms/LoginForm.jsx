import { TextField } from '@/components/TextField'
import { Button } from '@/components/Button'
import { useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { useLoadingStore } from '@/stores/loadingStore'

export default function LoginForm({ redirect }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ usr_UserID: null, password: null })
  const { setLoading } = useLoadingStore()

  const { login } = useAuth()

  const submit_form = async (e) => {
    e.preventDefault()

    await login({setErrors, setLoading, redirect, ...{usr_UserID: username, password}})
  }

  return (
    <>
      <form className="my-6" onSubmit={(e) => submit_form(e)}>
        <div>
          <TextField
            type="text"
            label="Username"
            placeholder="Enter your IWDR account's username..."
            name="usr_UserID"
            id="usr_UserID"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            error={!!errors.usr_UserID}
            error_message={errors.usr_UserID}
          />
        </div>
        <div className="mt-4">
          <TextField
            type="password"
            label="Password"
            placeholder="Enter your IWDR account's password..."
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
