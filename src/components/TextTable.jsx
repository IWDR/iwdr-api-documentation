import clsx from 'clsx';

export function TextTable({ name, id, label, options }) {
    const rows = options?.rows ?? [];

    return (
        <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:pt-5">
            <div>
                <span className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-white">{label}</span>
            </div>
            <div className="mt-2 sm:col-span-1 sm:mt-0">
                <div className="relative flex max-w-lg flex-grow rounded-md">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr className="divide-x divide-zinc-200 dark:divide-zinc-600">
                                {/* First col head is intentionally left blank */}
                                <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold sm:pl-0" />
                                <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold sm:pl-0" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-600">
                            {rows.map((row) => (
                                <tr key={row.field} className="divide-x divide-zinc-200 dark:divide-zinc-600">
                                    {/* First row space is for the label */}
                                    <td className="w-1/2 font-semibold dark:text-white sm:pl-0 sm:text-sm">
                                        {row.label}
                                    </td>
                                    <td className="w-1/2 text-sm text-zinc-500 dark:text-zinc-400 sm:pl-4">
                                        {row.value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
