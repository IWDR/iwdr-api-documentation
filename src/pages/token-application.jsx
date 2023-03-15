import {TextField} from "@/components/TextField";
import {useState} from "react";

export default function TokenApplication() {
    const [form, setForm] = useState({
        organization_name: '',
        organization_name_error: '',
        organization_total_dogs_to_import: '',
        organization_total_dogs_to_import_error: ''
    })

    return (
        <>
            <h1>
                Application for API Access
            </h1>
            <form>
                <div>
                    <h3 className="text-base font-semibold leading-6">
                        Organization Information
                    </h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-zinc-500" />
                <TextField value={form.organization_name}
                           onChange={(e) => setForm((form) => form.organization_name = e.currentTarget.value)}
                           label="Organization Name"
                           error={!!form.organization_name_error}
                           error_message={form.organization_name_error}
                           placeholder="Enter the name of your organization..."
                           required
                />
            </form>
        </>
    )
}