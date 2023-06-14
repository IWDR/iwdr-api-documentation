import { useEffect, useState } from 'react';
import { Modal } from '@/components/Modal';
import { Dialog } from '@headlessui/react';
import { Button } from '@/components/mdx';
import RadioField from '@/components/RadioField';
import useSWR from 'swr';
import { TextArea } from '@/components/TextArea';
import { TextTable } from '@/components/TextTable';
import { SelectField } from '@/components/SelectField';

export function CreateApplicationReviewDialog({ app }) {
    const [open, setOpen] = useState(false);
    const [appStatus, setAppStatus] = useState([]);
    const error_option = [{ label: 'Nothing', value: '' }];

    // Get the breeds as text not numbers
    const {
        data: appData,
        isLoading: isLoadingApp,
        error: errorApp,
    } = useSWR({ resource: `/api/access-application/${app.id}` });
    const organization_breeds_to_import =
        !errorApp && !isLoadingApp ? appData.data.organization_breeds_to_import : error_option;
    let breeds = '';
    for (let i = 0; i < organization_breeds_to_import.length; i++) {
        if (i === organization_breeds_to_import.length - 1) {
            breeds += organization_breeds_to_import[i];
        } else {
            breeds += organization_breeds_to_import[i] + ', ';
        }
    }

    // Get the options for data accuracy
    const {
        data: data_accuracy_types,
        isLoading: isLoadingDataAccuracyTypes,
        error: loadingDataAccuracyTypesError,
    } = useSWR({ resource: '/api/references/data-accuracy-impression' });
    const data_accuracy_options =
        !isLoadingDataAccuracyTypes && !loadingDataAccuracyTypesError
            ? data_accuracy_types.data.map((row) => {
                  return { text: row.label, value: row.id };
              })
            : error_option;

    // Get current storage options
    const {
        data: current_storage_vals,
        isLoading: isLoadingCurrentStorageVals,
        error: loadingCurrentStorageValuesError,
    } = useSWR({ resource: '/api/references/current-storage-solution' });
    const current_storage_values =
        !isLoadingCurrentStorageVals && !loadingCurrentStorageValuesError
            ? current_storage_vals.data.map((row) => {
                  return { label: row.label, value: row.id };
              })
            : error_option.map((row) => {
                  return { label: row.text, value: row.value };
              });

    const current_storage_options = {
        headers: current_storage_values,
        rows: [
            {
                label: 'Basic Dog Information',
                help: '(breed, date of birth, name, sex, sire, dam, etc...)',
                field: 'project_current_storage_breed_info',
                value: appData.data?.project_current_storage_breed_info[0]?.label ?? '',
            },
            {
                label: 'Diagnoses',
                field: 'project_current_storage_diagnoses',
                value: appData.data?.project_current_storage_diagnoses[0]?.label ?? '',
            },
            {
                label: 'Behavior Checklists',
                field: 'project_current_storage_bcls',
                value: appData.data?.project_current_storage_bcls[0]?.label ?? '',
            },
        ],
    };

    const {
        data: api_usage_vals,
        isLoading: isLoadingAPIUsageVals,
        error: loadingAPIUsageValsError,
    } = useSWR({ resource: '/api/references/application-usage' });
    const api_usage_headers =
        !isLoadingAPIUsageVals && !loadingAPIUsageValsError
            ? api_usage_vals.data.map((row) => {
                  return { label: row.label, value: row.id };
              })
            : error_option.map((row) => {
                  return { label: row.text, value: row.value };
              });

    const api_usage_options = {
        headers: api_usage_headers,
        rows: [
            {
                label: 'Basic Dog Information- New puppies as born',
                field: 'api_usage_dog_info_puppies',
                value: appData.data?.api_usage_dog_info_puppies[0]?.label ?? '',
            },
            {
                label: "Basic Dog Information- Updates on dog's names, status, death dates, etc",
                field: 'api_usage_dog_info_ancestors',
                value: appData.data?.api_usage_dog_info_ancestors[0]?.label ?? '',
            },
            {
                label: "Dog's Status History",
                field: 'api_usage_status_history',
                value: appData.data?.api_usage_status_history[0]?.label ?? '',
            },
            {
                label: 'Annual Health Survey',
                field: 'api_usage_health_survey',
                value: appData.data?.api_usage_health_survey[0]?.label ?? '',
            },
            {
                label: 'Behavior Checklists',
                field: 'api_usage_bcls',
                value: appData.data?.api_usage_bcls[0]?.label ?? '',
            },
            {
                label: 'Elbow',
                field: 'api_usage_elbows',
                value: appData.data?.api_usage_elbows[0]?.label ?? '',
            },
            {
                label: 'PennHIP',
                field: 'api_usage_pennhip',
                value: appData.data?.api_usage_pennhip[0]?.label ?? '',
            },
            {
                label: 'Hip OFA',
                field: 'api_usage_hip_extended_view',
                value: appData.data?.api_usage_hip_extended_view[0]?.label ?? '',
            },
            {
                label: 'Hip BVA',
                field: 'api_usage_hip_bva',
                value: appData.data?.api_usage_hip_bva[0]?.label ?? '',
            },
            {
                label: 'Hip FCI',
                field: 'api_usage_hip_fci',
                value: appData.data?.api_usage_hip_fci[0]?.label ?? '',
            },
            {
                label: 'Eye',
                field: 'api_usage_eye',
                value: appData.data?.api_usage_eye[0]?.label ?? '',
            },
            {
                label: 'Heart',
                field: 'api_usage_heart',
                value: appData.data?.api_usage_heart[0]?.label ?? '',
            },
            {
                label: 'Skin',
                field: 'api_usage_skin_quick',
                value: appData.data?.api_usage_skin_quick[0]?.label ?? '',
            },
            {
                label: 'General Health Diagnoses',
                field: 'api_usage_health_diagnoses',
                value: appData.data?.api_usage_health_diagnoses[0]?.label ?? '',
            },
            {
                label: 'Genetic Test Results',
                field: 'api_usage_genetic_test_results',
                value: appData.data?.api_usage_genetic_test_results[0]?.label ?? '',
            },
            {
                label: 'Weight',
                field: 'api_usage_weights',
                value: appData.data?.api_usage_weights[0]?.label ?? '',
            },
            {
                label: "Estrus's and Litter's",
                field: 'api_usage_estrus_litter',
                value: appData.data?.api_usage_estrus_litter[0]?.label ?? '',
            },
            {
                label: 'Estrus Details',
                field: 'api_usage_estrus_details',
                value: appData.data?.api_usage_estrus_details[0]?.label ?? '',
            },
            {
                label: 'Laboratory Tests',
                field: 'api_usage_lab_tests',
                value: appData.data?.api_usage_lab_tests[0]?.label ?? '',
            },
            {
                label: 'Surgery',
                field: 'api_usage_surgery',
                value: appData.data?.api_usage_surgery[0]?.label ?? '',
            },
            {
                label: 'Vaccines',
                field: 'api_usage_vaccines',
                value: appData.data?.api_usage_vaccines[0]?.label ?? '',
            },
            {
                label: 'X-Ray Imaging',
                field: 'api_usage_xray',
                value: appData.data?.api_usage_xray[0]?.label ?? '',
            },
        ],
    };

    const {
        data: appProgressData,
        error: appProgressError,
        isLoading: appProgressIsLoading,
    } = useSWR({ resource: '/api/references/application-progress?api=1' });
    const application_progress_options =
        !appProgressIsLoading && !appProgressError
            ? appProgressData.data?.map((row) => {
                  return { text: row.apc_ProgressText, value: row.apc_AppProgressCode };
              })
            : error_option.map((row) => {
                  return { label: row.text, value: row.value };
              });

    const submit = () => {
        // TODO: update the status based on selection
    };

    useEffect(() => {
        // console.log(appData.data);
    });

    return (
        <>
            <Button variant="text" onClick={() => setOpen(true)}>
                View Application
            </Button>
            <Modal open={open} openModifier={setOpen}>
                <Dialog.Title as="h1">API Access Review</Dialog.Title>
                <form id="api-access-review" className="space-y-8">
                    <div className="pt-4">
                        <div className="border-b pb-2 text-lg font-semibold leading-6 dark:text-white">
                            Organization Information
                        </div>

                        <TextArea
                            name="organization_total_dogs_to_import"
                            id="organization_total_dogs_to_import"
                            value={app.organization_total_dogs_to_import}
                            label="Total number of dogs in your database that need importing to IWDR"
                            horizontal
                            readonly
                            disabled
                        />

                        <TextArea
                            name="organization_breeds_to_import"
                            id="organization_breeds_to_import"
                            value={breeds}
                            label="Total number of dogs in your database that need importing to IWDR"
                            horizontal
                            readonly
                            disabled
                        />

                        <RadioField
                            name="organization_data_accuracy_impression"
                            id="organization_data_accuracy_impression"
                            label="Import's data accuracy"
                            options={data_accuracy_options}
                            defaultKey={app.data_accuracy_impression_id}
                            horizontal
                            disabled
                        />
                    </div>
                    <div className="pt-4">
                        <div className="border-b pb-2 text-lg font-semibold leading-6 dark:text-white">
                            Project Information
                        </div>

                        <TextArea
                            name="project_leader_name"
                            id="project_leader_name"
                            value={app.project_leader_name}
                            label="Project leader's name"
                            horizontal
                            readonly
                            disabled
                        />
                        <TextArea
                            name="project_leader_email"
                            id="project_leader_email"
                            value={app.project_leader_email}
                            label="Project leader's email"
                            horizontal
                            readonly
                            disabled
                        />
                        <TextArea
                            name="project_leader_phone"
                            id="project_leader_phone"
                            value={app.project_leader_phone}
                            label="Project leader's phone number"
                            horizontal
                            readonly
                            disabled
                        />
                        <TextArea
                            name="project_desired_start_date"
                            id="project_desired_start_date"
                            value={app.project_desired_start_date}
                            label="Project desired start data"
                            horizontal
                            readonly
                            disabled
                        />
                        <TextTable
                            name="project_current_storage_solution"
                            id="project_current_storage_solution"
                            label="How is your data for records needed in IWDR currently stored?"
                            options={current_storage_options}
                            readonly
                            disabled
                        />
                        <TextTable
                            name="project_desired_api_usage"
                            id="project_desired_api_usage"
                            label="Indicate how you want to use the IWDR API"
                            options={api_usage_options}
                            readonly
                            disabled
                        />
                        <SelectField
                            label="Application Status"
                            id="application-status"
                            horizontal
                            help="Update the status of this application"
                            options={application_progress_options}
                            onChange={setAppStatus}
                            value={appStatus}
                        />
                    </div>
                    <div className="flex flex-col justify-center space-y-3 border-t pt-4">
                        <Button className="mr-2" onClick={() => submit()}>
                            Save
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
