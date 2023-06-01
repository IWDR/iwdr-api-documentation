import {useState} from "react";
import {Button} from "@/components/Button";
import {Transition} from "@headlessui/react";
import {DataTable} from "@/components/DataTable";

export default function ConfidenceRatingCodeDataTable() {
    const [display, setDisplay] = useState(false);

    const headers = [
        {
            text: 'Unique Identifier',
            key: 'ConfidenceRatingCode'
        },
        {
            text: 'Display Name',
            key: 'ConfidenceText'
        }
    ];

    return (
        <>
            <Button onClick={() => setDisplay(!display)}>
                {display
                    ? "Hide Available Confidence Rating Codes"
                    : "Show Available Confidence Rating Codes"}
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
                    path='/api/references/confidence-rating-code'
                    headers={headers}
                    paginated
                    searchable
                />
            </Transition>
        </>
    )
}