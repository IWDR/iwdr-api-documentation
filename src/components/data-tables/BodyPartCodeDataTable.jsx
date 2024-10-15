import { useState } from 'react';
import { Button } from '@/components/Button';
import { Transition } from '@headlessui/react';
import { DataTable } from '@/components/DataTable';

export default function BodyPartCodeDataTable() {
    const [display, setDisplay] = useState(false);

    const headers = [
        {
            key: 'BodyPartCode',
            text: 'Unique Identifier',
        },
        {
            key: 'BodyPartText',
            text: 'Display Name',
        },
    ];

    return (
        <>
            <Button onClick={() => setDisplay(!display)}>
                {display ? 'Hide Available Body Part Codes' : 'Show Available Body Part Codes'}
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
                <DataTable path="/api/public/v1/references/body-part-code" headers={headers} paginated searchable />
            </Transition>
        </>
    );
}
