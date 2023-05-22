import {useState} from "react";
import {Button} from "@/components/Button";
import {Transition} from "@headlessui/react";
import {DataTable} from "@/components/DataTable";

export default function PupProgamRegionDataTable(){
    const [display, setDisplay] = useState(false);

    const headers = [
        {
            text: 'Unique Identifier',
            key: 'reg_RegionID'
        },
        {
            text: 'Display Name',
            key: 'reg_RegionName'
        }
    ];

    return (
        <>
            <Button onClick={() => setDisplay(!display)}>
                {display
                    ? 'Hide Available Pup Progam Regions'
                    : 'Show Available Pup Progam Regions'}
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
                    path='/api/region?pup_program=1'
                    headers={headers}
                    paginated
                    searchable
                />
            </Transition>
        </>
    )
}