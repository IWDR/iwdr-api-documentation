import { useState } from 'react';
import { Button } from '@/components/Button';
import { Transition } from '@headlessui/react';
import { DataTable } from '@/components/DataTable';

export default function CountryDataTable() {
    const [display, setDisplay] = useState(false);

    const headers = [
        {
            text: 'Unique Identifier',
            key: 'CountryID',
        },
        {
            text: 'Country Text',
            key: 'CountryText',
        },
        {
            text: 'Alpha-2 Code',
            component: (item) => <span>{item['CountryAbbrev2'].toUpperCase()}</span>,
        },
        {
            text: 'Alpha-3 Code',
            component: (item) => <span>{item['CountryAbbrev3'].toUpperCase()}</span>,
        },
    ];

    return (
        <>
            <Button onClick={() => setDisplay(!display)}>
                {display ? 'Hide Available Country codes' : 'Show Available Country codes'}
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
                <DataTable path="/api/public/v1/references/country" headers={headers} paginated searchable />
            </Transition>
        </>
    );
}
