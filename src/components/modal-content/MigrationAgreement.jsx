export default function MigrationAgreement() {
    return (
        <div className='dark:text-gray-100'>
            <h1>Data Migration Agreement</h1>
            <ol>
                <li>
                    This application will be followed by a video conference call and possible review
                    of your data. After this is completed, we can provide an estimated start time to
                    actively begin work on migrating your dataset to IWDR. This estimated start time
                    may be delayed by IWDR or your organization.
                </li>
                <li>
                    After acceptance of your project to the queue, your organization will commit to
                    cleanse your database to correct inaccuraciess and prepare it for import. IWDR
                    will provide documentation on data requirements and common data errors to test
                    for and correct.
                </li>
                <li>
                    Acceptance of your project to the queue and/or the estimated start date is not a
                    legally binding contract.
                </li>
                <li>
                    I will be charged and hourly fee based on $125 USD/hour for work done by
                    IWDR/CGS.
                </li>
                <li>
                    Additional work will be needed by your team to correct additional data errors or
                    omissions during the iterative trials import process.
                </li>
                <li>
                    Ancestor data can be included in the initial migration however only puppies
                    under age 36 days (5 weeks) and owned by your organization can be imported
                    through the API if your organization is the source.
                </li>
                <li>
                    I will engage as needed a database developer/manager to add fields or
                    objects/tables to our existing database and build queries of our data in the
                    appropriate format to accommodate the API requirements.
                </li>
            </ol>
        </div>
    )
}