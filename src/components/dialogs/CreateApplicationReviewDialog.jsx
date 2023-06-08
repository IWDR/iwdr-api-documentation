import {useEffect, useState} from 'react'
import {Modal} from '@/components/Modal'
import {Dialog} from '@headlessui/react'
import {Button} from "@/components/mdx";
import {TextField} from "@/components/TextField";
import {ComboboxField} from "@/components/ComboboxField";
import RadioField from "@/components/RadioField";
import useSWR from "swr";
import {Tag} from "@/components/Tag";
import clsx from "clsx";
import {InputError} from "@/components/InputError";
import {ExclamationCircleIcon} from "@heroicons/react/20/solid";
import {TextFieldStyle2} from "@/components/TextFieldStyle2";
import CheckboxCrossTab from "@/components/CheckboxCrosstab";

export function CreateApplicationReviewDialog({app}) {
    const [open, setOpen] = useState(false);
    const error_option = [{text: "Nothing", value: ''}];

    // Get the breeds as text not numbers
    const {
        data: appData,
        isLoading: isLoadingApp,
        error: errorApp
    } = useSWR({resource: `/api/access-application/${app.id}`});
    const organization_breeds_to_import = !errorApp && !isLoadingApp ? appData.data.organization_breeds_to_import : error_option;

    // Get the options for data accuracy
    const {
        data: data_accuracy_types,
        isLoading: isLoadingDataAccuracyTypes,
        error: loadingDataAccuracyTypesError
    } = useSWR({resource: '/api/references/data-accuracy-impression'});
    const data_accuracy_options = !isLoadingDataAccuracyTypes && !loadingDataAccuracyTypesError ? data_accuracy_types.data.map((row) => {
        return {text: row.label, value: row.id}
    }) : error_option;

    useEffect(() => {
        console.log(appData.data);
    })

    return (
        <>
            <Button variant='text' onClick={() => setOpen(true)}>View Application</Button>
            <Modal open={open} openModifier={setOpen}>
                <Dialog.Title as="h1">API Access Review</Dialog.Title>
                <form id="api-access-review" className="space-y-8">
                    <div className="divide-y divide-zinc-200 dark:divide-zinc-600 space-y-8">
                        <div className="pt-4">
                            <div className="text-lg font-semibold leading-6 dark:text-white">
                                Organization Information
                            </div>
                        </div>

                        <TextFieldStyle2
                            name="organization_total_dogs_to_import"
                            id="organization_total_dogs_to_import"
                            type="text"
                            value={app.organization_total_dogs_to_import}
                            label="Total number of dogs in your database that need importing to IWDR"
                            horizontal
                            readonly
                            disabled
                            className="max-sm:pt-3"
                        />

                        <TextFieldStyle2
                            name="organization_breeds_to_import"
                            id="organization_breeds_to_import"
                            type="text"
                            value={organization_breeds_to_import}
                            label="Total number of dogs in your database that need importing to IWDR"
                            horizontal
                            readonly
                            disabled
                            className="max-sm:pt-3"
                        />

                        <RadioField
                            name="organization_data_accuracy_impression"
                            id="organization_data_accuracy_impression"
                            label="Import's data accuracy"
                            help="Your impression of data accuracy within your database? i.e duplicates, data completeness &amp; correctness, data rigidity."
                            options={data_accuracy_options}
                            defaultKey={app.data_accuracy_impression_id}
                            horizontal
                            disabled
                            className="max-sm:pt-3"
                        />
                    </div>

                    <div className="divide-y divide-zinc-200 dark:divide-zinc-600 space-y-8">
                        <div className="pt-4">
                            <div className="text-lg font-semibold leading-6 dark:text-white">
                                Project Information
                            </div>
                        </div>

                        <TextFieldStyle2
                            name="project_leader_name"
                            id="project_leader_name"
                            type="text"
                            value={app.project_leader_name}
                            label="Project leader's name"
                            horizontal
                            readonly
                            disabled
                            className="max-sm:pt-3"
                        />

                        <TextFieldStyle2
                            name="project_leader_email"
                            id="project_leader_email"
                            type="text"
                            value={app.project_leader_email}
                            label="Project leader's email"
                            horizontal
                            readonly
                            disabled
                            className="max-sm:pt-3"
                        />

                        <TextFieldStyle2
                            name="project_leader_phone"
                            id="project_leader_phone"
                            type="text"
                            value={app.project_leader_phone}
                            label="Project leader's phone number"
                            horizontal
                            readonly
                            disabled
                            className="max-sm:pt-3"
                        />

                        <TextFieldStyle2
                            name="project_desired_start_date"
                            id="project_desired_start_date"
                            type="text"
                            value={app.project_desired_start_date}
                            label="Project desired start data"
                            horizontal
                            readonly
                            disabled
                            className="max-sm:pt-3"
                        />

                        {/*<div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:pt-5">
                            <div>
                                <label
                                    htmlFor="organization_total_dogs_to_import"
                                    className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-white"
                                >
                                    Total number of dogs in your database that need importing to IWDR
                                </label>
                            </div>
                            <div className="mt-2 sm:col-span-1 sm:mt-0">
                                <div
                                    className="relative flex max-w-lg flex-grow rounded-md">
                                    <input
                                        type="text"
                                        name="organization_total_dogs_to_import"
                                        id="organization_total_dogs_to_import"
                                        value={app.organization_total_dogs_to_import}
                                        readOnly={true}
                                        disabled={true}
                                        className='block w-full border-transparent bg-transparent p-3 sm:text-sm dark:placeholder:text-zinc-400'
                                    />
                                </div>
                            </div>
                        </div>*/}

                    </div>
                </form>
            </Modal>
        </>
    );
}

