import {TextField} from "@/components/TextField";
import {useState} from "react";

export async function getServerSideProps() {
    return {
        props: {
            title: 'API Token Application',
            description: 'Apply for access to the IWDR API.'
        },
    }
}

export default function TokenApplication(props) {
    const [form, setForm] = useState({
        organization_name: '',
        organization_name_error: '',
        organization_total_dogs_to_import: '',
        organization_total_dogs_to_import_error: ''
    })

    const submit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <h1>API Token Application</h1>
            <div className="not-prose m-0 mx-auto max-w-2xl space-y-10 pb-16 lg:max-w-5xl">
                <form className="space-y-1 divide-y divide-zinc-200 dark:divide-zinc-500" id="token-applicaiton"
                      onSubmit={(e) => submit(e)}>
                    <h3 className="text-base font-semibold leading-6 pb-3">
                        Organization Information
                    </h3>
                    <TextField value={form.organization_name}
                               onChange={(e) => setForm({...form, organization_name: e.target.value})}
                               label="Organization Name"
                               error={!!form.organization_name_error}
                               error_message={form.organization_name_error}
                               placeholder="Enter the name of your organization..."
                               horizontal
                               required
                    />
                </form>
            </div>
        </>
    )
}