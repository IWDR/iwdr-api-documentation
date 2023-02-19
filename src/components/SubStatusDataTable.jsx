import { useState } from 'react'
import useSWR from 'swr'
import { Button } from './Button'
import { DataTable } from './data_table/DataTable'
import Spinner from './Spinner'

export function SubStatusDataTable() {
  const {
    data: codes,
    isLoading,
    error,
  } = useSWR({ resource: '/api/sub-status-codes' })

  const [display, setDisplay] = useState(false)

  const headers = [
    {
      text: 'Unique Identifier',
      key: 'dssc_SubstatusCode',
    },
    {
      text: 'Sub Status Text',
      key: 'dssc_SubstatusText',
    },
    {
      text: 'Description',
      key: 'dssc_Description',
    },
    {
      text: 'Requires End Reason',
      component: (item) => (item['dssc_EndReasonRequired'] ? 'Yes' : 'No'),
    },
  ]

  if (isLoading) {
    return (
      <div className="not-prose">
        <div className="mb-24">
          <Spinner />
        </div>
      </div>
    )
  }

  if (error) {
    return <p>There was an issue loading this page. Please contact support.</p>
  }

  return (
    <>
      <Button onClick={() => setDisplay(!display)}>
        {display
          ? 'Hide Available Sub Status codes'
          : 'Show Available Sub Status codes'}
      </Button>
      <DataTable
        items={codes.data}
        noDataMsg={'Could not load data. Please contact support.'}
        headers={headers}
        className={!display && 'hidden'}
        sticky
      />
    </>
  )
}
