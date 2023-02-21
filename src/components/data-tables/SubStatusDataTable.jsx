import { useState } from 'react'
import useSWR from 'swr'
import { Button } from '../Button'
import { DataTable } from '@/components/DataTable'
import Spinner from '../Spinner'
import { Transition } from '@headlessui/react'

export function SubStatusDataTable() {
  const {
    data: codes,
    isLoading,
    error,
  } = useSWR({ resource: '/api/references/sub-status' })

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
      <Transition
        show={display}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <DataTable
          items={codes.data}
          noDataMsg={'Could not load data. Please contact support.'}
          headers={headers}
          sticky
        />
      </Transition>
    </>
  )
}
