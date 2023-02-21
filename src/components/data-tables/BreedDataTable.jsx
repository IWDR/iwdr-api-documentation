import {useState} from 'react'
import useSWR from 'swr'
import {Button} from '../Button'
import {DataTable} from '@/components/DataTable'
import Spinner from '../Spinner'
import {Transition} from '@headlessui/react'

export function BreedDataTable() {
    const {
        data: codes,
        isLoading,
        error,
    } = useSWR({resource: '/api/references/breed'})

    const [display, setDisplay] = useState(false)

    const headers = [
        {
            text: 'Unique Identifier',
            key: 'dbc_DogBreedCode',
        },
        {
            text: 'Breed Text',
            key: 'dbc_DogBreedDescription',
        },
    ]

    if (isLoading) {
        return (
            <div className="not-prose">
                <div className="mb-24">
                    <Spinner/>
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
                    ? 'Hide Available Breed codes'
                    : 'Show Available Breed codes'}
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
