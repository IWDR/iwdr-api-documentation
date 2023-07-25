import {TextField} from "@/components/TextField";
import {useState} from "react";
import {PhoneField} from "@/components/PhoneField";
import useSWR from "swr";
import RadioField from "@/components/RadioField";
import {Button} from "@/components/Button";
import CheckboxField from "@/components/CheckboxField";
import {Modal} from "@/components/Modal";
import {ComboboxField} from "@/components/ComboboxField";
import CheckboxFieldset from "@/components/CheckboxFieldset";
import MigrationAgreement from "@/components/modal-content/MigrationAgreement";
import DataMappingAgreement from "@/components/modal-content/MappingAgreement";
import APIUsageAgreement from "@/components/modal-content/APIUsageAgreement";
import CheckboxCrossTab from "@/components/CheckboxCrosstab";
import axios from "@/lib/axios";
import {useAlertStore} from "@/stores/alertStore";
import {useLoadingStore} from "@/stores/loadingStore";
import MailSentIcon from "@/components/icons/MailSentIcon";

export async function getServerSideProps() {
    return {
        props: {
            title: 'API Access Application',
            description: 'Apply for access to the IWDR API.'
        },
    }
}

export default function TokenApplication(props) {
    // Form field states
    const [organization_total_dogs_to_import, setOrganizationTotalDogsToImport] = useState('');
    const [organization_total_dogs_to_import_error, setOrganizationTotalDogsToImportError] = useState('');
    const [organization_breeds_to_import, setOrganizationBreedsToImport] = useState([]);
    const [organization_breeds_to_import_error, setOrganizationBreedsToImportError] = useState('');
    const [organization_data_accuracy_impression, setOrganizationDataAccuracyImpression] = useState('');
    const [organization_data_accuracy_impression_error, setOrganizationDataAccuracyImpressionError] = useState('');
    const [project_leader_name, setProjectLeaderName] = useState('');
    const [project_leader_name_error, setProjectLeaderNameError] = useState('');
    const [project_leader_email, setProjectLeaderEmail] = useState('');
    const [project_leader_email_error, setProjectLeaderEmailError] = useState('');
    const [project_leader_phone, setProjectLeaderPhone] = useState('');
    const [project_leader_phone_error, setProjectLeaderPhoneError] = useState('');
    const [project_desired_start_date, setProjectDesiredStartDate] = useState('');
    const [project_desired_start_date_error, setProjectDesiredStartDateError] = useState('');
    const [project_current_storage_setup, setProjectCurrentStorageSetup] = useState({});
    const [project_current_storage_error, setProjectCurrentStorageError] = useState('');
    const [project_desired_api_usage, setProjectDesiredAPIUsage] = useState({});
    const [project_desired_api_usage_error, setProjectDesiredAPIUsageError] = useState('');
    const [migration_agreement, setMigrationAgreement] = useState(false);
    const [migration_agreement_error, setMigrationAgreementError] = useState('');
    const [data_map_agreement, setDataMappingAgreement] = useState(false);
    const [data_map_agreement_error, setDataMappingAgreementError] = useState('');
    const [api_usage_agreement, setAPIUsageAgreement] = useState(false);
    const [api_usage_agreement_error, setAPIUsageAgreementError] = useState('');

    const {successAlert, errorAlert, serverErrorAlert} = useAlertStore();
    const {setLoading} = useLoadingStore();

    // Listbox options
    const error_option = [{text: "No options found.", value: ''}];
    const {
        data: breeds,
        isLoading: isLoadingBreeds,
        error: loadingBreedsError
    } = useSWR({resource: '/api/references/breed'});
    const breed_options = !isLoadingBreeds && !loadingBreedsError ? breeds.data.map((breed) => {
        return {text: breed.dbc_DogBreedDescription, value: breed.dbc_DogBreedCode}
    }) : error_option;

    const {
        data: data_accuracy_types,
        isLoading: isLoadingDataAccuracyTypes,
        error: loadingDataAccuracyTypesError
    } = useSWR({resource: '/api/references/data-accuracy-impression'});
    const data_accuracy_options = !isLoadingDataAccuracyTypes && !loadingDataAccuracyTypesError ? data_accuracy_types.data.map((row) => {
        return {text: row.label, value: row.id}
    }) : error_option;

    const {
        data: current_storage_vals,
        isLoading: isLoadingCurrentStorageVals,
        error: loadingCurrentStorageValuesError
    } = useSWR({resource: '/api/references/current-storage-solution'});
    const current_storage_values = !isLoadingCurrentStorageVals && !loadingCurrentStorageValuesError ? current_storage_vals.data.map((row) => {
        return {label: row.label, value: row.id}
    }) : error_option.map((row) => {
        return {label: row.text, value: row.value}
    });

    const {
        data: api_usage_vals,
        isLoading: isLoadingAPIUsageVals,
        error: loadingAPIUsageValsError,
    } = useSWR({resource: '/api/references/application-usage'});
    const api_usage_headers = !isLoadingAPIUsageVals && !loadingAPIUsageValsError ? api_usage_vals.data.map((row) => {
        return {label: row.label, value: row.id}
    }) : error_option.map((row) => {
        return {label: row.text, value: row.value}
    });

    const current_storage_options = {
        headers: current_storage_values,
        rows: [
            {
                label: "Basic Dog Information",
                help: "(breed, date of birth, name, sex, sire, dam, etc...)",
                field: "project_current_storage_breed_info",
            },
            {
                label: "Diagnoses",
                field: "project_current_storage_diagnoses",
            },
            {
                label: "Behavior Checklists",
                field: "project_current_storage_bcls",
            }
        ]
    };
    const api_usage_options = {
        headers: api_usage_headers,
        rows: [
            {
                label: "Dog Record Created For - New puppies as born",
                field: "api_usage_dog_info_puppies",
                readonly: [1,0,0]
            },
            {
                label: "Basic Dog Information (Status, Names, Dates)",
                field: "api_usage_dog_info_ancestors",
                readonly: [1,0,0]
            },
            {
                label: "Dog's Status History",
                field: "api_usage_status_history",
                readonly: [1,0,1]
            },
            {
                label: "Behavior Checklists",
                field: "api_usage_bcls",
                readonly: [1,0,0]
            },
            {
                label: "General Health Diagnoses",
                field: "api_usage_health_diagnoses",
                readonly: [1,0,0]
            },
            {
                label: "Genetic Test Results",
                field: "api_usage_genetic_test_results",
                readonly: [1,0,1]
            },
            {
                label: "Weight",
                field: "api_usage_weights",
                readonly: [1,0,0]
            },
            {
                label: "Estrus's and Litter's",
                field: "api_usage_estrus_litter",
                readonly: [1,0,1]
            },
            {
                label: "Estrus Details",
                field: "api_usage_estrus_details",
                readonly: [1,0,0]
            },
            {
                label: "Laboratory Tests",
                field: "api_usage_lab_tests",
                readonly: [1,0,1]
            },
            {
                label: "Vaccines",
                field: "api_usage_vaccines",
                readonly: [1,0,1]
            },
            {
                label: "Annual Health Survey",
                field: "api_usage_health_survey",
                readonly: [0,1,1]
            },
        ]
    };

    // Modal states
    const [migration_modal_open, setMigrationModalOpen] = useState(false);
    const [mapping_modal_open, setMappingModalOpen] = useState(false);
    const [api_modal_open, setAPIModalOpen] = useState(false);

    const reset = () => {
        setOrganizationTotalDogsToImport('')
        setOrganizationBreedsToImport([])
        setOrganizationDataAccuracyImpression('')
        setProjectLeaderName('')
        setProjectLeaderEmail('')
        setProjectLeaderPhone('')
        setProjectDesiredStartDate('')
        setProjectCurrentStorageSetup({})
        setProjectDesiredAPIUsage({})
        setMigrationAgreement(false)
        setDataMappingAgreement(false)
        setAPIUsageAgreement(false)
    }

    const setErrors = (error_list) => {
        setOrganizationTotalDogsToImportError(error_list.organization_total_dogs_to_import ?? '')
        setOrganizationBreedsToImportError(error_list.organization_breeds_to_import ?? '')
        setOrganizationDataAccuracyImpressionError(error_list.organization_data_accuracy_impression ?? '')
        setProjectLeaderNameError(error_list.project_leader_name ?? '')
        setProjectLeaderEmailError(error_list.project_leader_email ?? '')
        setProjectLeaderPhoneError(error_list.project_leader_phone ?? '')
        setProjectDesiredStartDateError(error_list.project_desired_start_date ?? '')
        setMigrationAgreementError(error_list.migration_agreement ?? '')
        setDataMappingAgreementError(error_list.data_map_agreement ?? '')
        setAPIUsageAgreementError(error_list.api_usage_agreement ?? '')

        errorAlert("Your submission contains errors. Please review your inputs and try again.", true, 6000);
        window.scrollTo({top: 0, left: 0});
    }

    const [submitted, setSubmitted] = useState(false);

    const submit = (e) => {
        e.preventDefault()
        let form = {
            organization_total_dogs_to_import,
            organization_breeds_to_import,
            organization_data_accuracy_impression,
            project_leader_name,
            project_leader_email,
            project_leader_phone,
            project_desired_start_date,
            ...project_current_storage_setup,
            ...project_desired_api_usage,
            migration_agreement,
            data_map_agreement,
            api_usage_agreement
        }

        setLoading(true);
        axios.post('/api/access-application', form)
            .then((res) => {
                console.log(res);
                if (res.status !== 200) return;

                successAlert("Application successfully submitted!", true, 6000);
                reset();
                setSubmitted(true);
            })
            .catch((err) => {
                if (err?.response?.status !== 422) {
                    serverErrorAlert();
                    return;
                }

                setErrors(err.response.data.errors)
            })
            .finally(() => setLoading(false))
    }

    // Render submission success insteand
    if (submitted) {
        return (
            <div className="flex justify-center flex-col items-center text-center">
                <MailSentIcon className="h-36 w-36 mx-auto"/>
                <h1>Your application has been received!</h1>
                <p className="text-sm">
                    Thank you for submitting an application to gain access to the IWDR API. We will
                    review your submission and afterwards you should receive an email with the outcome of your
                    application.
                </p>
                <Button variant="primary" arrow="right" href="/">Return to home</Button>
            </div>
        )
    }

    return (
        <>
            <h1>API Access Application</h1>
            <div className="m-0 mx-auto max-w-2xl lg:max-w-5xl">
                <form id="token-applicaiton" className="space-y-8"
                      onSubmit={(e) => submit(e)}>
                    <div className="divide-y divide-zinc-200 dark:divide-zinc-600 space-y-8">
                        {/* ORGANIZATION INFO */}
                        <div className="pt-4">
                            <span className="text-lg font-semibold leading-6 dark:text-white">
                                Organization Information
                            </span>
                            <p className="mt-1 max-w-2xl text-sm dark:text-white">
                                We need to collect some basic information about your use cases for the IWDR API.
                            </p>
                        </div>
                        <TextField
                            name="organization_total_dogs_to_import"
                            id="organization_total_dogs_to_import"
                            type="text"
                            value={organization_total_dogs_to_import}
                            onChange={(e) => setOrganizationTotalDogsToImport(e.target.value)}
                            label="Total number of dogs in your database that need importing to IWDR"
                            error={!!organization_total_dogs_to_import_error}
                            error_message={organization_total_dogs_to_import_error}
                            placeholder="Enter the total number of dogs planned for import..."
                            horizontal
                            required
                            className="max-sm:pt-3"
                        />
                        <ComboboxField
                            name="organization_breeds_to_import"
                            id="organization_breeds_to_import"
                            label="Breed(s) of dog to import"
                            value={organization_breeds_to_import}
                            error={!!organization_breeds_to_import_error}
                            error_message={organization_breeds_to_import_error}
                            onChange={setOrganizationBreedsToImport}
                            placeholder="Search for the breed(s) of dog to import..."
                            help="(choose all that apply)"
                            options={breed_options}
                            multiple
                            horizontal
                            className="max-sm:pt-3"
                        />
                        
                        <div>
                            <RadioField
                                name="organization_data_accuracy_impression"
                                id="organization_data_accuracy_impression"
                                label="Import's data accuracy"
                                help="Do you have data on all of your dogs in IWDR or your own database or spreadsheet? Can you identify that you are the managing owner of the dogs? For dogs existing in both IWDR and your own database/spreadsheet, can you match your dogs with their IWDR Dog IDs? How accurate are your birthdates and pedigrees?"
                                options={data_accuracy_options}
                                onChange={(e) => setOrganizationDataAccuracyImpression(e.target.checked ? e.target.value : null)}
                                error={!!organization_data_accuracy_impression_error}
                                error_message={organization_data_accuracy_impression_error}
                                required
                                className="max-sm:pt-3 sm:grid grid-cols-1 sm:gap-4 sm:pt-5"
                            />
                            <div className="text-xs mt-5">
                                <b>Excellent</b>: All birthdates are accurate, IWDR Dog IDs are matched for both existing dogs and ancestors, and where external breeding dogs have been used we know who owns them.
                                <br />
                                <b>Needs some clean up</b>: Generally birthdates are accurate and dog IDs are matched appropriately, however some ancestral data may be missing or we might need to research where external breeding dogs came from.
                                <br />
                                <b>Needs lots of clean up</b>: There are some gaps in our data, not all birthdates are accurate, and some ancestors owners are unknown
                                <br />
                                <b>I don't know</b>: IWDR can meet with your team to review the data you have and advise.
                            </div>
                        </div>
                    </div>
                    <div className="divide-y divide-zinc-200 dark:divide-zinc-600 space-y-8">
                        {/* PROJECT INFO */}
                        <div className="pt-4">
                            <span className="text-lg font-semibold leading-6 dark:text-white">
                                Project Information
                            </span>
                            <p className="mt-1 max-w-2xl text-sm dark:text-white">
                                We would like to know some more about the project that you&apos;re intending to use the
                                IWDR
                                API for.
                            </p>
                        </div>
                        <TextField
                            name="project_leader_name"
                            id="project_leader_name"
                            label="Project leader's name"
                            value={project_leader_name}
                            error={!!project_leader_name_error}
                            error_message={project_leader_name_error}
                            onChange={(e) => setProjectLeaderName(e.target.value)}
                            placeholder="Enter the name of your project leader..."
                            type="text"
                            horizontal
                            required
                            className="max-sm:pt-3"
                        />
                        <TextField
                            name="project_leader_email"
                            id="project_leader_email"
                            label="Project leader's email"
                            value={project_leader_email}
                            error={!!project_leader_email_error}
                            error_message={project_leader_email_error}
                            onChange={(e) => setProjectLeaderEmail(e.target.value)}
                            placeholder="Enter the email for the project leader identified above..."
                            type="email"
                            horizontal
                            required
                            className="max-sm:pt-3"
                        />
                        <PhoneField
                            name="project_leader_phone"
                            id="project_leader_phone"
                            label="Project leader's telephone number"
                            error={!!project_leader_phone_error}
                            error_message={project_leader_phone_error}
                            onChange={setProjectLeaderPhone}
                            placeholder="Enter the phone number to best reach the project leader..."
                            horizontal
                            required
                            className="max-sm:pt-3"
                        />
                        <TextField
                            name="project_desired_start_date"
                            id="project_desired_start_date"
                            value={project_desired_start_date}
                            error={!!project_desired_start_date_error}
                            error_message={project_desired_start_date_error}
                            onChange={(e) => setProjectDesiredStartDate(e.target.value)}
                            type="date"
                            placeholder="Select the desired date..."
                            label="Your ideal start date to begin data import?"
                            help="This is informational only and we can not to commit to starting on this date"
                            horizontal
                            required
                            className="max-sm:pt-3"
                        />
                        <CheckboxCrossTab
                            id="project_current_storage_solution"
                            label="How is your data for records needed in IWDR currently stored?"
                            help="(check all that apply)"
                            options={current_storage_options}
                            onChange={setProjectCurrentStorageSetup}
                            horizontal
                            required
                        />
                        <CheckboxCrossTab
                            id="project_desired_api_usage"
                            label="Indicate how you want to use the IWDR API"
                            help="(check all that apply)"
                            options={api_usage_options}
                            onChange={setProjectDesiredAPIUsage}
                            horizontal
                            required
                        />
                    </div>
                    {/* USAGE AGREEMENTS */}
                    <div className="space-y-1 text-left">
                        <div className="mb-4 border-b border-zinc-200 dark:border-zinc-600">
                            <span className="text-lg font-semibold leading-6 dark:text-white">
                                Usage Agreements
                            </span>
                            <p className="mt-1 max-w-2xl text-sm dark:text-white">
                                You must agree to all of the following to begin usage with the IWDR API. (click text to
                                read more)
                            </p>
                        </div>
                        <CheckboxField
                            name="migration_agreement"
                            id="migration_agreement"
                            onChange={(e) => setMigrationAgreement(e.target.checked)}
                            value={migration_agreement}
                            error={!!migration_agreement_error}
                            error_message={migration_agreement_error}
                            required
                        >
                            <Button type="button" variant='text' onClick={() => setMigrationModalOpen(true)}>
                                I understand and agree to all of the following concerning data migration of dogs and
                                other
                                data from our database to IWDR.
                            </Button>
                            <Modal open={migration_modal_open} openModifier={setMigrationModalOpen}>
                                <MigrationAgreement/>
                                <Button variant="primary" className="w-full"
                                        onClick={() => setMigrationModalOpen(false)}>Close</Button>
                            </Modal>
                        </CheckboxField>
                        <CheckboxField
                            name="data_map_agreement"
                            id="data_map_agreement"
                            onChange={(e) => setDataMappingAgreement(e.target.checked)}
                            value={data_map_agreement}
                            error={!!data_map_agreement_error}
                            error_message={data_map_agreement_error}
                            required
                        >
                            <Button type="button" variant='text' onClick={() => setMappingModalOpen(true)}>
                                I read and agree to the following concerning mapping data fields and drop down pick
                                choices.
                            </Button>
                            <Modal open={mapping_modal_open} openModifier={setMappingModalOpen}>
                                <DataMappingAgreement/>
                                <Button variant="primary" className="w-full"
                                        onClick={() => setMappingModalOpen(false)}>Close</Button>
                            </Modal>
                        </CheckboxField>
                        <CheckboxField
                            name="api_usage_agreement"
                            id="api_usage_agreement"
                            onChange={(e) => setAPIUsageAgreement(e.target.checked)}
                            value={api_usage_agreement}
                            error={!!api_usage_agreement_error}
                            error_message={api_usage_agreement_error}
                            required
                        >
                            <Button type="button" variant='text' onClick={() => setAPIModalOpen(true)}>
                                Use of the API requires you adhere to, and maintain, these criteria in a timely manner.
                            </Button>
                            <Modal open={api_modal_open} openModifier={setAPIModalOpen}>
                                <APIUsageAgreement/>
                                <Button variant="primary" className="w-full"
                                        onClick={() => setAPIModalOpen(false)}>Close</Button>
                            </Modal>
                        </CheckboxField>
                    </div>
                    <Button variant='primary' className="w-full" type="submit">Submit</Button>
                </form>
            </div>
        </>
    )
}