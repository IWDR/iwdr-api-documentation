import {useState} from "react";
import {Button} from "@/components/Button";
import {Transition} from "@headlessui/react";
import {DataTable} from "@/components/DataTable";

export default function WhelpQualityCodeDataTable() {
    const [display, setDisplay] = useState(false);

    const headers = [
        {
            text: 'Unique Identifier',
            key: 'wqc_WhelpQualityCode'
        },
        {
            text: 'Display Name',
            key: 'wqc_WhelpText'
        }
    ];

    return (
        <>
            <Button onClick={() => setDisplay(!display)}>
                {display
                    ? "Hide Available Whelp Quality Codes"
                    : "Show Available Whelp Quality Codes"}
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
                <DataTable
                    path='/api/references/whelp-quality-code'
                    headers={headers}
                    paginated
                    searchable
                />
            </Transition>
        </>
    )
}