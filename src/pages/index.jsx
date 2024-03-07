import { Guides } from '@/components/Guides';
import { HeroPattern } from '@/components/HeroPattern';
import { Resources } from '@/components/Resources';
import { Note } from '@/components/mdx';
import Link from 'next/link';
import Table from '@/components/Table';

export async function getServerSideProps() {
    const props = {
        sections: [
            { title: 'Guides', id: 'guides' },
            { title: 'Resources', id: 'resources' },
        ],
        description:
            'Learn everything there is to know about the IWDR API and how to integrate the IWDR API into your product.',
    };
    return { props };
}

export default function Index() {
    return (
        <>
            <HeroPattern />
            <h1>IWDR API Documentation</h1>
            <p className="lead">
                Use the IWDR API to access your organizations data stored within the IWDR database. There are many data
                models retrievable from the IWDR API such as, dogs, litters, health data, status histories, and much
                more.
            </p>

            <h2>Getting Started</h2>
            <Note>
                In order to use the IWDR API you must first acquire an authentication token. You can apply for an
                authentication token <a href="#">here, </a>
                if you do not already have one.
            </Note>
            <p className="lead">
                To get started, or, for an overview of the setup process, we highly recommend reading the{' '}
                <Link href="/quickstart">Quickstart</Link> page. You can also visit the{' '}
                <Link href="/authentication">Authentication</Link> page for information about using your IWDR API token
                to make authenticated HTTP requests.
            </p>

            <h2>What is an API and how can it help?</h2>
            <p className="lead">
                An API allows you to connect your existing database with the IWDR. Many organizations need to use the
                IWDR for its unique breeding selection and specialized program management tools, but also need to
                maintain data in their own internal database. This results in time consuming and costly data entry
                duplication. An API resolves this by automatically duplicating some of that data for you.
            </p>

            <h2>What services are available?</h2>
            <p className="lead">
                There are a number of options around how the API can work, and the IWDR does have some limitations
                around what data can be managed with an API.
            </p>
            <p className="lead">
                <span className="underline">
                    It is faster, cheaper, and more accurate in tying pedigrees together if you enter fresh data
                    directly into the IWDR, and then use the API to duplicate that data into your own database.
                </span>
                There are some cases where we can enable data duplication the other way around (e.g. data is entered in
                your database and duplicated to the IWDR) however this is a time consuming endeavor restricted to very
                large organizations with sufficient IT staffing and budget - read more on this under Option C.
            </p>
            <div className="lead">
                <p className="font-bold">
                    Option A: Create records for the following in the IWDR, then at a frequency you choose, duplicate
                    the data into your database:
                </p>
                <Note>
                    Most useful when you want to eliminate duplicate data entry but want to have EBVs and advanced
                    genetic tools with collaboration but need to manage the puppy raiser, clients, etc in your database
                </Note>
                <p>
                    You enter your data in IWDR and then IWDR sends a copy of the data you want electronically and adds
                    this new data to your database. Easiest, least expensive to set up and ,eliminates duplicate data
                    entry.
                </p>
                <Table
                    headers={[
                        {
                            key: 'IWDR',
                            text: 'IWDR is Source',
                        },
                        {
                            key: 'You',
                            text: 'YourDB is Source',
                        },
                    ]}
                    values={[
                        {
                            IWDR: 'New puppies',
                            You: 'Dog updates (names, status, key dates, microchip)',
                        },
                        {
                            IWDR: 'Diagnosis and genetic tests',
                        },
                        {
                            IWDR: 'Behavior Checklist',
                        },
                        {
                            IWDR: 'Litters',
                        },
                        {
                            IWDR: 'Other types of data you can specify in the API application',
                        },
                    ]}
                ></Table>
            </div>

            <div className="lead">
                <p className="font-bold">
                    Option B: Enable survey data to be reviewed then electronically added to IWDR
                </p>
                <Note>You are already an IWDR user and you are just adding survey functionality.</Note>
                <ul>
                    <li>
                        We will provide links to specialized IWDR-approved forms. Currently an Annual Health Survey is
                        available. In the future this will include puppy raiser survey data and other useful forms.
                    </li>
                    <li>
                        You email the surveys to your target audience: for example, puppy raisers and owners of
                        withdrawn, breeding and graduated dogs. The surveys are prefilled with appropriate
                        identification information from data for the person and dog. Your IT can do the set up to
                        configure pulling the data from your own database.
                    </li>
                    <li>Alternatively, if IWDR is your only database, we can set this up.</li>
                    <li>
                        The survey responses are stored for review in IWDR and by specific action approve entry into
                        IWDR.
                    </li>
                </ul>
                <Table
                    headers={[
                        {
                            key: 'IWDR',
                            text: 'IWDR is Source',
                        },
                        {
                            key: 'You',
                            text: 'YourDB is Source',
                        },
                    ]}
                    values={[
                        {
                            IWDR: 'New puppies',
                        },
                        {
                            IWDR: 'Diagnosis and genetic tests',
                            You: 'IWDR Health Survey responses',
                        },
                        {
                            IWDR: 'Behavior Checklist',
                        },
                    ]}
                ></Table>
            </div>
            <div className="lead">
                <p className="font-bold">
                    Option C: Very large orgs can apply to enable pushing dog and EBV related data from their database
                    to the IWDR. There are some key limitations:
                </p>
                <Note>
                    Best for organizations that want to have the EBV calculations and test mating features which also
                    enhances effective collaboration. EBV data can be pushed back to your database if desired.
                </Note>
                <p>
                    Data integrity must meet high standards. Upon your initial API application, we will discuss this in
                    detail with you, however your dog data must meet certain standards as not to cause inaccuracies or
                    duplications within the IWDR.
                </p>
                <p className="mb-0">This is an involved process with multiple steps:</p>
                <ul className="mt-0">
                    <li>
                        Work with the IWDR team to complete an initial migration of the data to IWDR. This may involve
                        collaboration with canine team staff to review ancestral dog records, etc. On a case-by-case
                        basis the IWDR may be able to offer contractor support for some of this work at your expense,
                        pending staff availability. Migrations are the most time consuming task of the set up.
                    </li>
                    <li>
                        After the initial migration of your dog data, only puppies owned by your organization who are
                        less than 36 days old can be imported via the API.
                    </li>
                    <li>
                        Must have highly skilled IT support: Your team will need to
                        <ul className="mt-0">
                            <li>Review and cleanse all your dog data to meet IWDR requirements</li>
                            <li>Build data files with required and other data required for import</li>
                            <li>
                                Have a good understanding of API configuration on your end to properly set up the data
                                transfer.
                            </li>
                            <li>
                                Set up and maintain mapping and storage of IWDR keys and the import and last update
                                data.
                            </li>
                            <li>Build the infrastructure/flows to process successful and failed API transactions.</li>
                        </ul>
                    </li>
                </ul>
                <Table
                    headers={[
                        {
                            key: 'IWDR',
                            text: 'IWDR is Source',
                        },
                        {
                            key: 'You',
                            text: 'YourDB is Source',
                        },
                    ]}
                    values={[
                        {
                            You: 'New puppies (less than 35 days old) after initial migration',
                        },
                        {
                            IWDR: 'Diagnoses and genetic tests (preferred)',
                            You: 'Discussion needed',
                        },
                        {
                            IWDR: 'Behavior Checklist- (optional)',
                            You: 'Behavior Checklist (most often the case)',
                        },
                    ]}
                ></Table>
            </div>

            <Guides />
            <Resources />
        </>
    );
}
