import clsx from "clsx";
import {InputError} from "@/components/InputError";

export default function RadioField({
                                       name,
                                       id,
                                       onChange,
                                       className,
                                       label,
                                       help,
                                       error,
                                       error_message,
                                       options = [],
                                       disabled = false,
                                       defaultKey = null,
                                       required = false,
                                       horizontal = false,
                                   }) {
    const clean_style = "text-emerald-500 focus:ring-emerald-500 checked:bg-emerald-500 dark:checked:bg-emerald-500";
    const error_style = "text-red-500 ring-1 ring-red-500 focus:ring-red-500 checked:bg-red-500 dark:checked:bg-red-500";
    const disabled_style = "disabled:bg-zinc-300 disabled:checked:bg-emerald-500";

    return (
        <div className={clsx(horizontal && 'sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4', className)}>
            <div>
                <label className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-white" id={id}>
                    {label}
                    {required && <span className="text-red-600 ml-0.5">*</span>}
                    {help && <p className="text-sm font-medium max-w-sm my-0.5">{help}</p>}
                </label>
                {error && <InputError error_message={error_message} id={`${id}-error`}/>}
            </div>
            <fieldset className="mt-4 sm:col-span-2 max-w-lg p-3 min-h-full">
                <legend className="sr-only">
                    {help}
                </legend>
                <div className="flex flex-row md:space-x-8 max-sm:flex-col max-sm:space-y-1">
                    {options.map((option) => (
                        <div key={option.value} className="flex items-center">
                            <input
                                id={`radio-option-${option.value}`}
                                name={name}
                                type="radio"
                                defaultChecked={defaultKey ? option.value === defaultKey : false}
                                className={clsx("h-4 w-4 rounded-full drop-shadow-sm border-zinc-300 dark:bg-zinc-400/50 focus:ring-1 focus:ring-offset-0 focus:outline-0",
                                    error ? error_style : clean_style,
                                    disabled ? disabled_style : null
                                )}
                                value={option.value}
                                onChange={(e) => onChange(e)}
                                required={required}
                                disabled={disabled}
                            />
                            <label htmlFor={`radio-option-${option.value}`}
                                   className="ml-3 block text-sm font-medium leading-6">
                                {option.text}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    )
}