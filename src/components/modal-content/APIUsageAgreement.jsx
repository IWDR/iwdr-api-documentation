export default function APIUsageAgreement() {
    return (
        <div className="dark:text-gray-200">
            <h1>API Usage Agreement</h1>
            <ol>
                <li>
                    Managing owner of the dog is correct. Managing owners in IWDR are defined as entities such as
                    working dog organizations and private breeders. They are <strong>not</strong> adopters, clients,
                    agencies or others where you place dogs.
                </li>
                <li>
                    Maps with the IWDR keyID and your database key ID for where applicable. Some examples- DogID,
                    PersonIDs for breeders, owners, veteterinarians, BCL scorers, diagnosess, genetic tests, country,
                    microchip types, BCL types, BCL scores.
                </li>
                <li>
                    Processing the failed imports, updates or exports. You will need a table in your database to store
                    the transaction logs.
                </li>
                <li>
                    Immediately populate appropriate fields added to your database with data from the logs from imports,
                    updates or exports. Examples depending on functionality of the API- DateSuccessfulImport from IWDR,
                    DateSuccessfulExport To IWDR, DateSuccessfulUpdate To IWDR, DateSuccessfulUpdate From IWDR,
                    IWDRRecordKeyID for this record, IWDRDogID.
                    <br/>
                    <ul className="list-none">
                        <li className="text-sm font-semibold">
                            Note- If your database is the source, you will also need
                            to store in your database the date anyone last updated/edited that record.
                        </li>
                    </ul>
                </li>
                <li>
                    IWDR/CGS will NOT do this work. If our support is needed after initial training to help problem
                    solve and answer questions, your organization will be charged and hourly fee based on $125 USD/hour
                    for work done by IWDR/CGS.
                </li>
            </ol>
        </div>
    )
}