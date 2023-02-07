import { CreateTokenDialog } from '@/components/CreateTokenDialog'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { useAlertStore } from '@/lib/stores/alertStore'
import { Button } from '@/components/Button'
import { useLoadingStore } from '@/lib/stores/loadingStore'
import { ActionPanel } from '@/components/ActionPanel'
import { TextField } from '@/components/TextField'
import { ClipboardIcon } from '@heroicons/react/20/solid'

// Fetch tokens on server and return as prop
// Redirect if the users token list is unreadable
export async function getServerSideProps({ req }) {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tokens`, {
    credentials: 'include',
    headers: {
      Cookie: req.headers.cookie,
      'X-XSRF-TOKEN': req.cookies['XSRF-TOKEN'],
      'X-Requested-With': 'XMLHttpRequest',
    },
  })

  let initTokens = await result.json()

  if (!Array.isArray(initTokens)) {
    return {
      redirect: {
        permanent: false,
        destination: '/login?redirect=tokens',
      },
    }
  }

  return {
    props: {
      title: 'Manage Tokens',
      initTokens,
    },
  }
}

export default function Tokens({ initTokens }) {
  const [tokens, setTokens] = useState(initTokens)
  const [showActionPanel, setShowActionPanel] = useState(false)
  const [freshToken, setFreshToken] = useState('')
  const { showAlert } = useAlertStore()
  const { setLoading } = useLoadingStore()

  const refreshTokens = async (new_token) => {
    if (new_token) {
      setFreshToken(new_token.token)
      setShowActionPanel(true)
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tokens`, {
      credentials: 'include',
      headers: {
        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.log(res)
        }

        return res.json()
      })
      .then((data) => setTokens(data))
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteToken = (id) => {
    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tokens/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((res) => {
        if (!res.ok) {
          showAlert(
            'Something went wrong when performing this action. Please try again later',
            'error',
            true,
            4000
          )
        }

        refreshTokens()
        showAlert('Token revoked successfully.', 'success', true, 4000)
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <ActionPanel
        title="Your new token was created successfully!"
        subtitle="Copy and save your new token now! This will be the only time it is ever displayed."
        open={showActionPanel}
        setOpen={setShowActionPanel}
      >
        <TextField
          value={freshToken}
          readonly={true}
          className="rounded-r-none"
          copyable={true}
        />
      </ActionPanel>
      <div className="sm:item-center sm:flex">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold">Tokens</h1>
          <p className="mt-2 text-sm">
            A list of all tokens currently active for your organization.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <CreateTokenDialog onSubmit={(data) => refreshTokens(data)} />
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-zinc-600">
                <thead className="bg-slate-100 dark:bg-zinc-800">
                  <tr>
                    <th
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                      scope="col"
                    >
                      Actions
                    </th>
                    <th
                      className="py-3.5 px-3 text-left text-sm font-semibold"
                      scope="col"
                    >
                      ID
                    </th>
                    <th
                      className="py-3.5 px-3 text-left text-sm font-semibold"
                      scope="col"
                    >
                      Name
                    </th>
                    <th
                      className="py-3.5 px-3 text-left text-sm font-semibold"
                      scope="col"
                    >
                      Date Created
                    </th>
                    <th
                      className="py-3.5 px-3 text-left text-sm font-semibold"
                      scope="col"
                    >
                      Date Last Used
                    </th>
                  </tr>
                </thead>
                <tbody className="not-prose divide-y divide-gray-200 bg-white dark:divide-zinc-500 dark:bg-zinc-700">
                  {tokens.length > 0 ? (
                    tokens.map((token) => (
                      <tr key={token.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                          <Button
                            variant="filled"
                            onClick={() => deleteToken(token.id)}
                          >
                            Revoke
                          </Button>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          {token.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          {token.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          {new Date(token.created_at).toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          {new Date(token.updated_at).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="w-max whitespace-nowrap py-4 px-3 text-center text-sm"
                      >
                        You have not created any tokens yet. Click the create
                        token button to make a new one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
