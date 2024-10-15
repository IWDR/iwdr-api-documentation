import { useState } from 'react';
import { Button } from '@/components/Button';
import { Transition } from '@headlessui/react';
import { DataTable } from '@/components/DataTable';

export default function BroodBreedingBehaviorFDataTable() {
    const [display, setDisplay] = useState(false);

    const headers = [
        {
            text: 'Unique Identifier',
            key: 'bbf_BrdBehFCode',
        },
        {
            text: 'Display Name',
            key: 'bbf_Text',
        },
    ];

    return (
        <>
            <Button onClick={() => setDisplay(!display)}>
                {display
                    ? 'Hide Available Brood Breeding Behavior Codes'
                    : 'Show Available Brood Breeding Behavior Codes'}
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
                    path="/api/public/v1/references/brood-breeding-behavior-female"
                    headers={headers}
                    paginated
                    searchable
                />
            </Transition>
        </>
    );
}
