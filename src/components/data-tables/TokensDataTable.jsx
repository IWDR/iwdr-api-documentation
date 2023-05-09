import { CreateTokenDialog } from '@/components/dialogs/CreateTokenDialog'
import {useRef, useState} from 'react'
import { useAlertStore } from '@/stores/alertStore'
import { Button } from '@/components/Button'
import { useLoadingStore } from '@/stores/loadingStore'
import { ActionPanel } from '@/components/ActionPanel'
import { TextField } from '@/components/TextField'
import axios from '@/lib/axios'
import { DataTable } from '@/components/DataTable'

export default function TokensDataTable() {
  const [showActionPanel, setShowActionPanel] = useState(false)
  const [newToken, setNewToken] = useState('')
  const { showAlert, serverErrorAlert } = useAlertStore()
  const { setLoading } = useLoadingStore()
  const dataRef = useRef();
  const deleteToken = (id) => {
    setLoading(true)
    axios
      .delete(`/api/tokens/${id}`)
      .then((res) => {
        if (!res.status === 204) {
          serverErrorAlert()
        }

        showAlert('Token revoked successfully.', 'success', true, 4000)
        dataRef.current.mutate();
      })
      .catch((error) => {
        console.log(error)
        throw Error
      })
      .finally(() => setLoading(false))
  }

  const new_token_created = (token) => {
    setNewToken(token)
    setShowActionPanel(true)
    dataRef.current.mutate();
  }

  const headers = [
    {
      text: 'Actions',
      component: (item) => (
        <Button variant="filled" onClick={() => deleteToken(item.id)}>
          Revoke
        </Button>
      ),
    },
    {
      text: 'ID',
      key: 'id',
    },
    {
      text: 'Name',
      key: 'name',
    },
    {
      text: 'Date Created',
      component: (item) => new Date(item.created_at).toLocaleString(),
    },
    {
      text: 'Date Last Used',
      component: (item) =>
        item.last_used_at
          ? new Date(item.last_used_at).toLocaleString()
          : 'N/A',
    },
  ]

  const noDataMsg =
    'You have not created any tokens yet. Click the create token button to make a new one.'

  return (
    <>
      <ActionPanel
        title="Your new token was created successfully!"
        subtitle="Copy and save your new token now! This will be the only time it is ever displayed."
        open={showActionPanel}
        setOpen={setShowActionPanel}
      >
        <TextField
          value={newToken}
          readonly={true}
          className="rounded-r-none"
          copyable={true}
        />
      </ActionPanel>
      <div className="sm:item-center sm:flex">
        <div className="sm:flex-auto">
          <p className="mt-2 text-sm">
            A list of all tokens currently active for your organization.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <CreateTokenDialog onSubmit={(token) => new_token_created(token)} />
        </div>
      </div>
      <DataTable headers={headers} noDataMsg={noDataMsg} path="/api/tokens" ref={dataRef} />
    </>
  )
}
