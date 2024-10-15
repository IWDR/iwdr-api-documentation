import { useState } from 'react';
import { Button } from '@/components/Button';
import { Transition } from '@headlessui/react';
import { DataTable } from '@/components/DataTable';

export default function CoatColorDataTable() {
    const [display, setDisplay] = useState(false);

    const headers = [
        {
            key: 'dbcc_BreedColorCode',
            text: 'Unique Identifier',
        },
        {
            key: 'dbcc_ColorDescription',
            text: 'Display Name',
        },
        {
            key: 'dbc_DogBreedDescription',
            text: 'Breed Name',
        },
    ];

    return (
        <>
            <Button onClick={() => setDisplay(!display)}>
                {display ? 'Hide Available Coat Colors' : 'Show Available Coat Colors'}
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
                <DataTable path="/api/public/v1/references/coat-color" headers={headers} paginated searchable />
            </Transition>
        </>
    );
}
