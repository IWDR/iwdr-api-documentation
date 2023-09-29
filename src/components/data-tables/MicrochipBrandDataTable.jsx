import { useState } from 'react';
import { Button } from '@/components/Button';
import { Transition } from '@headlessui/react';
import { DataTable } from '@/components/DataTable';

export default function MicrochipBrandDataTable() {
    const [display, setDisplay] = useState(false);

    const headers = [
        {
            text: 'Unique Identifier',
            key: 'psn_PersonID',
        },
        {
            text: 'Display Name',
            key: 'psn_DisplayName',
        },
    ];

    return (
        <>
            <Button onClick={() => setDisplay(!display)}>
                {display ? 'Hide Available Microchip Brands' : 'Show Available Microchip Brands'}
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
                <DataTable path="/api/person?microchip_brand=1" headers={headers} paginated searchable />
            </Transition>
        </>
    );
}