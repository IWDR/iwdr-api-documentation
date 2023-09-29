import { useState } from 'react';
import { Button } from '../Button';
import { DataTable } from '@/components/DataTable';
import { Transition } from '@headlessui/react';

export function SubStatusDataTable() {
    const [display, setDisplay] = useState(false);

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
    ];

    return (
        <>
            <Button onClick={() => setDisplay(!display)}>
                {display ? 'Hide Available Sub Status codes' : 'Show Available Sub Status codes'}
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
                <DataTable path="/api/references/sub-status" headers={headers} paginated searchable />
            </Transition>
        </>
    );
}
