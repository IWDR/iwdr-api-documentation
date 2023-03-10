import { SelectField } from '@/components/SelectField'
import { TextField } from '@/components/TextField'
import axios from '@/lib/axios'
import { useLoadingStore } from '@/stores/loadingStore'
import { useContext, useState } from 'react'
import { AuthContext } from '../AuthProvider'

export function CreateTokenForm({ onSubmit, id }) {
  const { setLoading } = useLoadingStore()
  const user = useContext(AuthContext)

  const [token_name, setTokenName] = useState('')
  const [token_name_error, setTokenNameError] = useState('')
  const [token_abilities, setTokenAbilities] = useState([])
  const [abilities_error, setAbilitiesError] = useState('')

  const abilities = user.permissions.map((perm) => {
    return { text: perm, value: perm }
  })

  const reset = () => {
    setTokenName('')
    setTokenNameError('')
    setTokenAbilities([])
    setAbilitiesError('')
  }

  const submit = (e) => {
    e.preventDefault()

    setLoading(true)
    axios
      .post('/tokens', {
        token_name,
        abilities: token_abilities,
      })
      .then((res) => {
        reset()
        onSubmit(res.data.token)
      })
      .catch((err) => {
        if (err.response.status === 422) {
          let errors = err.response.data.errors

          setTokenNameError(errors.token_name ?? '')
          setAbilitiesError(errors.abilities ?? '')
        }
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
          options={abilities}
          value={token_abilities}
          onChange={setTokenAbilities}
          error={!!abilities_error}
          error_message={abilities_error}
        />
      </div>
    </form>
  )
}
