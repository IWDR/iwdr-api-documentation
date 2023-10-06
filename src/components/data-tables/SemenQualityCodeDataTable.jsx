import { useState } from 'react';
import { Button } from '@/components/Button';
import { Transition } from '@headlessui/react';
import { DataTable } from '@/components/DataTable';

export default function SemenQualityCodeDataTable() {
    const [display, setDisplay] = useState(false);

    const headers = [
        {
            text: 'Unique Identifier',
            key: 'sqc_SemenQualityCode',
        },
        {
            text: 'Display Name',
            key: 'sqc_SemenText',
        },
    ];

    return (
        <>
            <Button onClick={() => setDisplay(!display)}>
                {display ? 'Hide Available Semen Quality Codes' : 'Show Available Semen Quality Codes'}
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
                <DataTable path="/api/references/semen-quality-code" headers={headers} paginated searchable />
            </Transition>
        </>
    );
}