import clsx from 'clsx';
import { InputError } from '@/components/InputError';
import { useEffect, useState } from 'react';

function SimpleCheckbox({ id, name, error, label, field, dataValue, onChange, disabled = false }) {
    const clean_style = 'text-emerald-500 focus:ring-emerald-500 checked:bg-emerald-500 dark:checked:bg-emerald-500';
    const error_style = 'text-red-500 focus:ring-red-500 checked:bg-red-500 dark:checked:bg-red-500';
    const disabled_style = 'disabled:bg-zinc-300';

    return (
        <>
            <input
                id={id}
                name={name}
                className={clsx(
                    error ? error_style : clean_style,
                    disabled ? disabled_style : null,
                    'h-4 w-4 rounded border-zinc-300 drop-shadow-sm focus:outline-0 focus:ring-1 focus:ring-offset-0 dark:bg-zinc-400/50'
                )}
                type="checkbox"
                onChange={(e) => onChange(e)}
                data-field={field}
                data-value={dataValue}
                disabled={disabled}
            />
            <label htmlFor={id} className="sr-only">
                {label}
            </label>
        </>
    );
}

export default function CheckboxCrossTab({
    id,
    label,
    className,
    help,
    onChange,
    error,
    error_message,
    options,
    disabled = false,
    horizontal = false,
    required = false,
}) {
    const headers = options?.headers ?? [];
    const rows = options?.rows ?? [];

    const [selectedOptions, setSelectedOptions] = useState({});

    useEffect(() => {
        let optionsCopy = selectedOptions;
        // Init the selectedOptions with empty selections for each field
        if (Object.keys(optionsCopy).length === 0) {
            rows.forEach((row) => {
                optionsCopy[row.field] = [];
            });
        }

        setSelectedOptions(optionsCopy);
        onChange(optionsCopy);
    }, []);
    const updateSelected = (e) => {
        let selectedOptionsCopy = selectedOptions;

        let field = e.target.dataset.field;
        let value = e.target.dataset.value;
        let row_arr = selectedOptionsCopy[field];
        let value_index = row_arr.findIndex((match) => match === value);

        if (value_index > -1) {
            selectedOptionsCopy[field].splice(value_index, 1);
        } else {
            selectedOptionsCopy[field].push(value);
        }

        setSelectedOptions(selectedOptionsCopy);
        onChange(selectedOptionsCopy);
    };

    return (
        <div className={clsx(horizontal && 'sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5', className)}>
            <div>
                <label className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-white" id={id}>
                    {label}
                    {required && <span className="ml-0.5 text-red-600">*</span>}
                    {help && (
                        <p className="my-0.5 max-w-sm text-sm font-normal text-zinc-500 dark:text-zinc-300/80">
                            {help}
                        </p>
                    )}
                </label>
                {error && <InputError error_message={error_message} id={`${id}-error`} />}
            </div>
            <fieldset
                className={clsx(
                    horizontal ? 'max-w-2xl max-sm:py-3 sm:col-span-2 md:px-3' : 'max-w-md py-6',
                    'flow-root'
                )}
            >
                <legend className="sr-only">{help}</legend>
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr className="divide-x divide-zinc-200 dark:divide-zinc-600">
                                    {/* First col head is intentionally left blank */}
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold sm:pl-0"
                                    />
                                    {headers.map((header) => (
                                        <th
                                            key={header.value}
                                            scope="col"
                                            className="px-4 py-3.5 text-left text-sm font-semibold"
                                        >
                                            {header.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-600">
                                {rows.map(
                                    (row) =>
                                        !row.disabled && (
                                            <tr
                                                key={row.field}
                                                className="divide-x divide-zinc-200 dark:divide-zinc-600"
                                            >
                                                {/* First row space is for the label */}
                                                <td className="py-4 pl-4 pr-4 text-sm font-semibold dark:text-white sm:pl-0">
                                                    {row.label}
                                                </td>
                                                {headers.map((header, index) => {
                                                    let checkbox = (
                                                        <SimpleCheckbox
                                                            id={`${row.field}-${header.value}`}
                                                            name={`${row.field}-${header.value}`}
                                                            error={error}
                                                            field={row.field}
                                                            dataValue={header.value}
                                                            label={`Choose ${row.label} as ${header.label}`}
                                                            onChange={(e) => updateSelected(e)}
                                                            disabled={
                                                                row.hasOwnProperty('readonly')
                                                                    ? row.readonly[index]
                                                                    : disabled
                                                            }
                                                        />
                                                    );

                                                    if (index === headers.length) {
                                                        return (
                                                            <td
                                                                className="py-4 pl-4 pr-4 text-center text-sm sm:pr-0"
                                                                key={`${row.field}-${header.value}`}
                                                            >
                                                                {checkbox}
                                                            </td>
                                                        );
                                                    }

                                                    return (
                                                        <td
                                                            className="p-4 text-center text-sm"
                                                            key={`${row.field}-${header.value}`}
                                                        >
                                                            {checkbox}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </fieldset>
        </div>
    );
}
