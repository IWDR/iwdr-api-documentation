import { useState } from 'react';
import { Button } from '@/components/Button';
import { Transition } from '@headlessui/react';
import { DataTable } from '@/components/DataTable';

export default function HealthDiagnosesTraitCodeIDDataTable() {
    const [display, setDisplay] = useState(false);

    const headers = [
        {
            text: 'Unique Identifier',
            key: 'CodeID',
        },
        {
            text: 'Display Name',
            key: 'DiagnosisText',
        },
    ];

    return (
        <>
            <Button onClick={() => setDisplay(!display)}>
                {display ? "Hide Available Trait Code ID's" : "Show Available Trait Code ID's"}
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
                <DataTable path="/api/references/trait-code-id" headers={headers} paginated searchable />
            </Transition>
        </>
    );
}