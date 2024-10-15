import { useState } from 'react';
import { Button } from '../Button';
import { DataTable } from '@/components/DataTable';
import { Transition } from '@headlessui/react';

export function BreedDataTable() {
    const [display, setDisplay] = useState(false);

    const headers = [
        {
            text: 'Unique Identifier',
            key: 'dbc_DogBreedCode',
        },
        {
            text: 'Breed Text',
            key: 'dbc_DogBreedDescription',
        },
    ];

    return (
        <>
            <Button onClick={() => setDisplay(!display)}>
                {display ? 'Hide Available Breed codes' : 'Show Available Breed codes'}
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
                <DataTable path="/api/public/v1/references/breed" headers={headers} paginated searchable />
            </Transition>
        </>
    );
}
