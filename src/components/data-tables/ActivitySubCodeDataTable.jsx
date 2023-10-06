import { useState } from 'react';
import { Button } from '@/components/Button';
import { Transition } from '@headlessui/react';
import { DataTable } from '@/components/DataTable';

export default function ActivitySubCodeDataTable() {
    const [display, setDisplay] = useState(false);

    const headers = [
        {
            key: 'acs_ActSubCode',
            text: 'Unique Identifier',
        },
        {
            key: 'acs_ActSubText',
            text: 'Display Name',
        },
    ];

    return (
        <>
            <Button onClick={() => setDisplay(!display)}>
                {display ? 'Hide Available Activity Sub Codes' : 'Show Available Activity Sub Codes'}
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
                <DataTable path="/api/references/activity-sub-code" headers={headers} paginated searchable />
            </Transition>
        </>
    );
}