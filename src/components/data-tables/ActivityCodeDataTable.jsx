import { useState } from 'react';
import { Button } from '@/components/Button';
import { Transition } from '@headlessui/react';
import { DataTable } from '@/components/DataTable';

export default function ActivityCodeDataTable() {
    const [display, setDisplay] = useState(false);

    const headers = [
        {
            key: 'dac_ActivityCode',
            text: 'Unique Identifier',
        },
        {
            key: 'dac_ActivityText',
            text: 'Display Name',
        },
    ];

    return (
        <>
            <Button onClick={() => setDisplay(!display)}>
                {display ? 'Hide Available Activity Codes' : 'Show Available Activity Codes'}
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
                <DataTable path="/api/public/v1/references/activity-code" headers={headers} paginated searchable />
            </Transition>
        </>
    );
}
