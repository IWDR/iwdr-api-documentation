import { SelectField } from '@/components/SelectField'
import { TextField } from '@/components/TextField'
import { useAlertStore } from '@/lib/stores/alertStore'
import { useAuthStore } from '@/lib/stores/authStore'
import { useLoadingStore } from '@/lib/stores/loadingStore'
import Cookies from 'js-cookie'
import { useState } from 'react'

export function CreateTokenForm({ onSubmit, id }) {
  const user = useAuthStore((state) => state.user)
  const { setLoading } = useLoadingStore()
  const { showAlert } = useAlertStore()

  const availableAbilites = user.permissions.map((text) => ({
    text: text,
    value: text,
  }))
  const [token_name, setTokenName] = useState('')
  const [token_name_error, setTokenNameError] = useState('')
  const [abilities, setTokenAbilities] = useState([])
  const [abilities_error, setAbilitiesError] = useState('')

  const reset = () => {
    setTokenName('')
    setTokenNameError('')
    setTokenAbilities([])
    setAbilitiesError('')
  }

  const submit = (e) => {
    e.preventDefault()

    setLoading(true)
    fetch(`${process.env.API_URL}/tokens`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token_name,
        abilities,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 422) {
            let data = await res.json()
            let errors = data.errors

            setTokenNameError(errors.token_name ?? '')
            setAbilitiesError(errors.abilities ?? '')
          } else {
            console.log(res)
            showAlert(
              'There was an error processing your request. Please try again later.',
              'error',
              true
            )
          }

          return
        }

        let token_data = await res.json()
        reset()
        onSubmit(token_data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <form id={id} onSubmit={(e) => submit(e)}>
      <div>
        <TextField
          error={!!token_name_error}
          error_message={token_name_error}
          label="Token name"
          name="token_name"
          id="token_name"
          placeholder="Enter the token name..."
          value={token_name}
          onChange={(e) => setTokenName(e.target.value)}
          type="text"
        />
      </div>
      <div className="mt-4">
        <SelectField
          label="Token abilities"
          name="abilities"
          id="abilities"
          placeholder="Select any number of abilities..."
          options={availableAbilites}
          value={abilities}
          onChange={setTokenAbilities}
          error={!!abilities_error}
          error_message={abilities_error}
        />
      </div>
    </form>
  )
}
