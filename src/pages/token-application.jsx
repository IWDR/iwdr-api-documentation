import { TextField } from '@/components/TextField';
import { useState } from 'react';
import { PhoneField } from '@/components/PhoneField';
import useSWR from 'swr';
import RadioField from '@/components/RadioField';
import { Button } from '@/components/Button';
import CheckboxField from '@/components/CheckboxField';
import { Modal } from '@/components/Modal';
import { ComboboxField } from '@/components/ComboboxField';
import MigrationAgreement from '@/components/modal-content/MigrationAgreement';
import DataMappingAgreement from '@/components/modal-content/MappingAgreement';
import APIUsageAgreement from '@/components/modal-content/APIUsageAgreement';
import CheckboxCrossTab from '@/components/CheckboxCrosstab';
import axios from '@/lib/axios';
import { useAlertStore } from '@/stores/alertStore';
import { useLoadingStore } from '@/stores/loadingStore';
import MailSentIcon from '@/components/icons/MailSentIcon';
import { Note } from '@/components/mdx';
import clsx from 'clsx';
import { TextArea } from '@/components/TextArea';
import { useSession } from 'next-auth/react';

export function getServerSideProps() {
    return {
        props: {
            title: 'API Access Application',
            description: 'Apply for access to the IWDR API.',
        },
    };
}

export default function TokenApplication(props) {
    // Form field states
    const [total_dogs_to_import, setTotalDogsToImport] = useState('');
    const [total_dogs_to_import_error, setTotalDogsToImportError] = useState('');
    const [breeds_to_import, setBreedsToImport] = useState([]);
    const [breeds_to_import_error, setBreedsToImportError] = useState('');
    const [data_accuracy_impression, setDataAccuracyImpression] = useState('');
    const [data_accuracy_impression_error, setDataAccuracyImpressionError] = useState('');
    const [name, setName] = useState('');
    const [name_error, setNameError] = useState('');
    const [email, setEmail] = useState('');
    const [email_error, setEmailError] = useState('');
    const [phone, setPhone] = useState('');
    const [phone_error, setPhoneError] = useState('');
    const [desired_start_date, setDesiredStartDate] = useState('');
    const [desired_start_date_error, setDesiredStartDateError] = useState('');
    const [project_desired_api_usage, setProjectDesiredAPIUsage] = useState({});
    const [project_desired_api_usage_error, setProjectDesiredAPIUsageError] = useState('');
    const [project_api_migrations, setProjectAPIMigrations] = useState({});
    const [project_api_migrations_error, setProjectAPIMigrationsError] = useState('');
    const [project_survey_responses, setProjectSurveyResponses] = useState({});
    const [project_survey_responses_error, setProjectSurveyResponsesError] = useState('');
    const [migration_agreement, setMigrationAgreement] = useState(false);
    const [migration_agreement_error, setMigrationAgreementError] = useState('');
    const [data_map_agreement, setDataMappingAgreement] = useState(false);
    const [data_map_agreement_error, setDataMappingAgreementError] = useState('');
    const [api_usage_agreement, setAPIUsageAgreement] = useState(false);
    const [api_usage_agreement_error, setAPIUsageAgreementError] = useState('');

    const [custom_development_request, setCustomDevelopmentRequest] = useState(false);
    const [custom_development_request_comments, setCustomDevelopmentRequestComments] = useState('');

    const { data: session, status } = useSession({ required: true });
    const { successAlert, errorAlert, serverErrorAlert } = useAlertStore();
    const { setLoading } = useLoadingStore();

    const [visible, setVisible] = useState(false);

    // Listbox options
    const error_option = [{ text: 'No options found.', value: '' }];
    const {
        data: breeds,
        isLoading: isLoadingBreeds,
        error: loadingBreedsError,
    } = useSWR({
        resource: '/api/public/v1/references/breed',
        options: { headers: { Authorization: 'Bearer ' + session?.user?.access_token } },
    });
    const breed_options =
        !isLoadingBreeds && !loadingBreedsError
            ? breeds.data.map((breed) => {
                return { text: breed.dbc_DogBreedDescription, value: breed.dbc_DogBreedCode };
            })
            : error_option;

    const {
        data: data_accuracy_types,
        isLoading: isLoadingDataAccuracyTypes,
        error: loadingDataAccuracyTypesError,
    } = useSWR({
        resource: '/api/public/v1/references/data-accuracy-impression',
        options: { headers: { Authorization: 'Bearer ' + session?.user?.access_token } },
    });
    const data_accuracy_options =
        !isLoadingDataAccuracyTypes && !loadingDataAccuracyTypesError
            ? data_accuracy_types.data.map((row) => {
                return { text: row.label, value: row.id };
            })
            : error_option;

    const {
        data: api_usage_vals,
        isLoading: isLoadingAPIUsageVals,
        error: loadingAPIUsageValsError,
    } = useSWR({
        resource: '/api/public/v1/references/application-usage',
        options: { headers: { Authorization: 'Bearer ' + session?.user?.access_token } },
    });
    const api_usage_headers =
        !isLoadingAPIUsageVals && !loadingAPIUsageValsError
            ? api_usage_vals.data.map((row) => {
                return { label: row.label, value: row.id };
            })
            : error_option.map((row) => {
                return { label: row.text, value: row.value };
            });

    const api_usage_options = {
        headers: api_usage_headers.slice(0, 2),
        rows: [
            {
                label: 'New dogs after initial migration',
                field: 'application_usage.new_dogs',
                readonly: [1, 0],
                help: 'Create puppies in IWDR then push to your database the same day via API',
            },
            {
                label: 'Request consideration to import new puppies after migration complete',
                field: 'application_usage.new_puppies_after_migration',
                readonly: [0, 0],
                help: 'Possible option ONLY for large organizations with established database and excellent in-house tech support',
            },
            {
                label: 'Dog updates',
                field: 'application_usage.dog_updates',
                readonly: [0, 0],
                help: 'Can only choose one',
            },
            {
                label: 'Dog status history',
                field: 'application_usage.dog_status_history',
                readonly: [1, 0],
                help: 'Automatically created by IWDR with dog updates',
            },
            {
                label: 'Behavior Checklists',
                field: 'application_usage.bcls',
                readonly: [0, 0],
                help: 'Can only choose one',
            },
            {
                label: 'Diagnoses',
                field: 'application_usage.diagnoses',
                readonly: [0, 0],
                help: 'Can only choose one. Prefer IWDR is source',
            },
            {
                label: 'Estrus and Litters',
                field: 'application_usage.estrus_and_litters',
                readonly: [1, 0],
            },
            {
                label: 'Estrus Details',
                field: 'application_usage.estrus_details',
                readonly: [0, 0],
            },
            {
                label: 'Medical Procedures',
                field: 'application_usage.medical_procedures',
                readonly: [0, 0],
                help: 'Can only choose one',
            },
            {
                label: 'Weight',
                field: 'application_usage.weight',
                readonly: [0, 0],
                help: 'Can only choose one',
            },
        ],
    };

    const api_survey_responses = {
        headers: [{ label: 'Process Surveys using IWDR Interface', value: 1 }],
        rows: [
            {
                label: 'Diagnoses from Form Assembly',
                field: 'application_survey_responses.diagnoeses_form_assembly',
                help: 'Currently Form Assembly is required for owners to submit a survey. However, IWDR will create means that does not require Form Assembly',
            },
        ],
    };

    const api_migration_options = {
        headers: [{ label: 'Yes, import our existing data', value: 1 }],
        rows: [
            {
                label: 'Dogs you own',
                field: 'application_migration.dogs_you_own',
            },
            {
                label: 'Ancestors owned by others but are related to dog you own',
                field: 'application_migration.ancestors',
            },
            {
                label: 'Dog status history',
                field: 'application_migration.status_history',
            },
            {
                label: 'Behavior Checklists',
                field: 'application_migration.bcls',
            },
            {
                label: 'Diagnoses',
                field: 'application_migration.diagnoses',
            },
            {
                label: 'Estrus and Litters',
                field: 'application_migration.estrus_and_litters',
            },
            {
                label: 'Estrus Details',
                field: 'application_migration.estrus_details',
            },
            {
                label: 'Weight',
                field: 'application_migration.weight',
            },
            {
                label: 'Medical Procedures',
                field: 'application_migration.medical_procedures',
                help: "Not needed for EBV's",
            },
        ],
    };

    // Modal states
    const [migration_modal_open, setMigrationModalOpen] = useState(false);
    const [mapping_modal_open, setMappingModalOpen] = useState(false);
    const [api_modal_open, setAPIModalOpen] = useState(false);

    const reset = () => {
        setTotalDogsToImport('');
        setBreedsToImport([]);
        setDataAccuracyImpression('');
        setName('');
        setEmail('');
        setPhone('');
        setDesiredStartDate('');
        setProjectDesiredAPIUsage({});
        setProjectSurveyResponses({});
        setProjectAPIMigrations({});
        setMigrationAgreement(false);
        setDataMappingAgreement(false);
        setAPIUsageAgreement(false);
        setCustomDevelopmentRequest(false);
        setCustomDevelopmentRequestComments('');
    };

    const setErrors = (error_list) => {
        setTotalDogsToImportError(error_list.total_dogs_to_import ?? '');
        setBreedsToImportError(error_list.breeds_to_import ?? '');
        setDataAccuracyImpressionError(error_list.data_accuracy_impression ?? '');
        setNameError(error_list.name ?? '');
        setEmailError(error_list.email ?? '');
        setPhoneError(error_list.phone ?? '');
        setDesiredStartDateError(error_list.desired_start_date ?? '');
        setMigrationAgreementError(error_list.migration_agreement ?? '');
        setDataMappingAgreementError(error_list.data_map_agreement ?? '');
        setAPIUsageAgreementError(error_list.api_usage_agreement ?? '');

        errorAlert('Your submission contains errors. Please review your inputs and try again.', true, 6000);
        window.scrollTo({ top: 0, left: 0 });
    };

    const [submitted, setSubmitted] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        let form = {
            total_dogs_to_import,
            breeds_to_import,
            data_accuracy_impression,
            name,
            email,
            phone,
            desired_start_date,
            project_desired_api_usage,
            project_survey_responses,
            project_api_migrations,
            migration_agreement,
            data_map_agreement,
            api_usage_agreement,
            custom_development_request,
            custom_development_request_comments,
        };

        setLoading(true);
        axios
            .post('/api/public/v1/api-applications', form, {
                headers: { Authorization: 'Bearer ' + session?.user?.access_token },
            })
            .then((res) => {
                if (res.status !== 200) return;

                successAlert('Application successfully submitted!', true, 6000);
                reset();
                setSubmitted(true);
            })
            .catch((err) => {
                if (err?.response?.status !== 422) {
                    console.log(err);
                    serverErrorAlert();
                    return;
                }

                setErrors(err.response.data.errors);
            })
            .finally(() => setLoading(false));
    };

    if (status === 'loading') return <p>Loading...</p>;

    // Render submission success instead
    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center text-center">
                <MailSentIcon className="mx-auto h-36 w-36" />
                <h1>Your application has been received!</h1>
                <p className="text-sm">
                    Thank you for submitting an application to gain access to the IWDR API. We will review your
                    submission and afterwards you should receive an email with the outcome of your application.
                </p>
                <Button variant="primary" arrow="right" href="/">
                    Return to home
                </Button>
            </div>
        );
    }

    return (
        <>
            <h1>API Access Application</h1>
            <div className="m-0 mx-auto max-w-2xl lg:max-w-5xl">
                <form id="token-applicaiton" className="space-y-8" onSubmit={(e) => submit(e)}>
                    <div className="space-y-8 divide-y divide-zinc-200 dark:divide-zinc-600">
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
                            name="total_dogs_to_import"
                            id="total_dogs_to_import"
                            type="text"
                            value={total_dogs_to_import}
                            onChange={(e) => setTotalDogsToImport(e.target.value)}
                            label="Total number of dogs in your database that need importing to IWDR"
                            error={!!total_dogs_to_import_error}
                            error_message={total_dogs_to_import_error}
                            placeholder="Enter the total number of dogs planned for import..."
                            horizontal
                            required
                            className="max-sm:pt-3"
                        />
                        <ComboboxField
                            name="breeds_to_import"
                            id="breeds_to_import"
                            label="Breed(s) of dog to import"
                            value={breeds_to_import}
                            error={!!breeds_to_import_error}
                            error_message={breeds_to_import_error}
                            onChange={setBreedsToImport}
                            placeholder="Search for the breed(s) of dog to import..."
                            help="(choose all that apply)"
                            options={breed_options}
                            multiple
                            horizontal
                            className="max-sm:pt-3"
                        />

                        <div>
                            <RadioField
                                name="data_accuracy_impression"
                                id="data_accuracy_impression"
                                label="Import's data accuracy"
                                help="Do you have data on all of your dogs in IWDR or your own database or spreadsheet? Can you identify that you are the managing owner of the dogs? For dogs existing in both IWDR and your own database/spreadsheet, can you match your dogs with their IWDR Dog IDs? How accurate are your birthdates and pedigrees?"
                                options={data_accuracy_options}
                                onChange={(e) => setDataAccuracyImpression(e.target.checked ? e.target.value : null)}
                                error={!!data_accuracy_impression_error}
                                error_message={data_accuracy_impression_error}
                                required
                                className="grid-cols-1 max-sm:pt-3 sm:grid sm:gap-4 sm:pt-5"
                            />
                            <Note>
                                <div className="mt-5 text-xs">
                                    <b>Excellent</b>: All birthdates are accurate, IWDR Dog IDs are matched for both
                                    existing dogs and ancestors, and where external breeding dogs have been used we know
                                    who owns them.
                                    <br />
                                    <b>Needs some clean up</b>: Generally birthdates are accurate and dog IDs are
                                    matched appropriately, however some ancestral data may be missing or we might need
                                    to research where external breeding dogs came from.
                                    <br />
                                    <b>Needs lots of clean up</b>: There are some gaps in our data, not all birthdates
                                    are accurate, and some ancestors owners are unknown
                                    <br />
                                    <b>I don&apos;t know</b>: IWDR can meet with your team to review the data you have
                                    and advise.
                                </div>
                            </Note>
                        </div>
                    </div>
                    <div className="space-y-8 divide-y divide-zinc-200 dark:divide-zinc-600">
                        {/* PROJECT INFO */}
                        <div className="pt-4">
                            <span className="text-lg font-semibold leading-6 dark:text-white">Project Information</span>
                            <p className="mt-1 max-w-2xl text-sm dark:text-white">
                                We would like to know some more about the project that you&apos;re intending to use the
                                IWDR API for.
                            </p>
                        </div>
                        <TextField
                            name="name"
                            id="name"
                            label="Project leader's name"
                            value={name}
                            error={!!name_error}
                            error_message={name_error}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter the name of your project leader..."
                            type="text"
                            horizontal
                            required
                            className="max-sm:pt-3"
                        />
                        <TextField
                            name="email"
                            id="email"
                            label="Project leader's email"
                            value={email}
                            error={!!email_error}
                            error_message={email_error}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter the email for the project leader identified above..."
                            type="email"
                            horizontal
                            required
                            className="max-sm:pt-3"
                        />
                        <PhoneField
                            name="phone"
                            id="phone"
                            label="Project leader's telephone number"
                            error={!!phone_error}
                            error_message={phone_error}
                            onChange={setPhone}
                            placeholder="Enter the phone number to best reach the project leader..."
                            horizontal
                            required
                            className="max-sm:pt-3"
                        />
                        <TextField
                            name="desired_start_date"
                            id="desired_start_date"
                            value={desired_start_date}
                            error={!!desired_start_date_error}
                            error_message={desired_start_date_error}
                            onChange={(e) => setDesiredStartDate(e.target.value)}
                            type="date"
                            placeholder="Select the desired date..."
                            label="Your ideal start date to begin data import?"
                            help="This is informational only and we can not to commit to starting on this date"
                            horizontal
                            required
                            className="max-sm:pt-3"
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
                        <CheckboxCrossTab
                            id={'project_survey_responses'}
                            label={'Survey Responses'}
                            help={'(check all that apply)'}
                            options={api_survey_responses}
                            onChange={setProjectSurveyResponses}
                            horizontal
                            required
                        />
                        <CheckboxCrossTab
                            id="project_api_migrations"
                            label="Migrations from your database to IWDR"
                            help="(check all that apply)"
                            options={api_migration_options}
                            onChange={setProjectAPIMigrations}
                            horizontal
                            required
                        />
                        <div className="pt-3.5">
                            <CheckboxField
                                id="custom_development_request"
                                label="Custom Development Request"
                                help="If you are a large organization who wishes to discuss custom API development (any work that falls outside what you have indicated in the table above OR have chosen options that require additional customization on our part), including importing dogs from your own database into the IWDR, check this box and we can discuss your needs at our scoping meeting. Note that additional fees and longer timeframes apply for this option."
                                onChange={(e) => {
                                    setCustomDevelopmentRequest(e.target.checked);
                                    setVisible(!visible);
                                }}
                            />
                            <div className={clsx(!custom_development_request && 'hidden')}>
                                <TextArea
                                    name="custom_development_request_comments"
                                    id="custom_development_request_comments"
                                    label="Reason for custom development request"
                                    rows="4"
                                    value={custom_development_request_comments}
                                    onChange={(e) => setCustomDevelopmentRequestComments(e.target.value)}
                                    placeholder="Enter details about request..."
                                    isVisible={visible}
                                />
                            </div>
                        </div>
                    </div>
                    {/* USAGE AGREEMENTS */}
                    <div className="space-y-1 text-left">
                        <div className="mb-4 border-b border-zinc-200 dark:border-zinc-600">
                            <span className="text-lg font-semibold leading-6 dark:text-white">Usage Agreements</span>
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
                            <Button type="button" variant="text" onClick={() => setMigrationModalOpen(true)}>
                                I understand and agree to all of the following concerning data migration of dogs and
                                other data from our database to IWDR.
                            </Button>
                            <Modal open={migration_modal_open} openModifier={setMigrationModalOpen}>
                                <MigrationAgreement />
                                <Button
                                    variant="primary"
                                    className="w-full"
                                    onClick={() => setMigrationModalOpen(false)}
                                >
                                    Close
                                </Button>
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
                            <Button type="button" variant="text" onClick={() => setMappingModalOpen(true)}>
                                I read and agree to the following concerning mapping data fields and drop down pick
                                choices.
                            </Button>
                            <Modal open={mapping_modal_open} openModifier={setMappingModalOpen}>
                                <DataMappingAgreement />
                                <Button variant="primary" className="w-full" onClick={() => setMappingModalOpen(false)}>
                                    Close
                                </Button>
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
                            <Button type="button" variant="text" onClick={() => setAPIModalOpen(true)}>
                                Use of the API requires you adhere to, and maintain, these criteria in a timely manner.
                            </Button>
                            <Modal open={api_modal_open} openModifier={setAPIModalOpen}>
                                <APIUsageAgreement />
                                <Button variant="primary" className="w-full" onClick={() => setAPIModalOpen(false)}>
                                    Close
                                </Button>
                            </Modal>
                        </CheckboxField>
                    </div>
                    <Button variant="primary" className="w-full" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </>
    );
}
