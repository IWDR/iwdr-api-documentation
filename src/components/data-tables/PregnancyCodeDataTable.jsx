import { useState } from 'react';
import { Button } from '@/components/Button';
import { Transition } from '@headlessui/react';
import { DataTable } from '@/components/DataTable';

export default function PregnancyCodeDataTable() {
    const [display, setDisplay] = useState(false);

    const headers = [
        {
            text: 'Unique Identifier',
            key: 'prc_PregnancyCode',
        },
        {
            text: 'Display Name',
            key: 'prc_PregnancyText',
        },
    ];

    return (
        <>
            <Button onClick={() => setDisplay(!display)}>
                {display ? 'Hide Available Pregnancy Codes' : 'Show Available Pregnancy Codes'}
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
                <DataTable path="/api/public/v1/references/pregnancy-code" headers={headers} paginated searchable />
            </Transition>
        </>
    );
}
