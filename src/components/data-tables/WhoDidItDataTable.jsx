import { useState } from 'react';
import { Button } from '@/components/Button';
import { Transition } from '@headlessui/react';
import { DataTable } from '@/components/DataTable';

export default function WhoDidItDataTable() {
    const [display, setDisplay] = useState(false);

    const headers = [
        {
            text: 'Unique Identifier',
            key: 'psn_PersonID',
        },
        {
            text: 'Display Name',
            key: 'psn_Last',
        },
    ];

    return (
        <>
            <Button onClick={() => setDisplay(!display)}>
                {display ? "Hide Available ID's" : "Show Available ID's"}
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
                <DataTable path="/api/public/v1/person?who_did_it=1" headers={headers} paginated searchable />
            </Transition>
        </>
    );
}
