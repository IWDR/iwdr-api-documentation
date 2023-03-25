import clsx from "clsx";
import {useEffect, useState} from "react";
import {InputError} from "@/components/InputError";

export default function CheckboxFieldset({
                                             id,
                                             className,
                                             label,
                                             error,
                                             error_message,
                                             options,
                                             value,
                                             onChange,
                                             help,
                                             required = false,
                                             horizontal = false,
                                         }) {
    const clean_style = "text-emerald-500 focus:ring-emerald-500 checked:bg-emerald-500 dark:checked:bg-emerald-500";
    const error_style = "text-red-500 ring-1 ring-red-500 focus:ring-red-500 checked:bg-red-500 dark:checked:bg-red-500";

    const [selectedOptions, setSelectedOptions] = useState(value);

    const option_updated = (key, checked) => {
        let selected = selectedOptions

        if (checked) {
            selected.push(key)
        } else {
            let id = selected.findIndex((value) => value === key);

            if (id > -1) {
                selected.splice(id, 1)
            }
        }

        setSelectedOptions(selected)
    }

    useEffect(() => {
        onChange(selectedOptions)

        return () => {
            onChange([]);
        }
    }, [selectedOptions]);

    return (
        <div className={clsx(horizontal && "sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5", className)}>
            <div>
                <label className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-white" id={id}>
                    {label}
                    {required && <span className="text-red-600 ml-0.5">*</span>}
                    {help && <p className="text-sm font-medium max-w-sm my-0.5">{help}</p>}
                </label>
                {error && <InputError error_message={error_message} id={`${id}-error`}/>}
            </div>
            <fieldset className={clsx(horizontal ? "sm:col-span-2 max-w-lg md:px-3 max-sm:py-3" : "py-6 max-w-md")}>
                <legend className="sr-only">
                    {help}
                </legend>
                <div className="flex flex-col space-y-2 max-sm:space-y-0">
                    {
                        options.map((option) => (
                            <div className="relative flex items-start pb-4" key={option.value}>
                                <div className="min-w-0 flex-1 text-sm leading-6 not-prose">
                                    <label htmlFor={`${option.value}-check-choice`}
                                           className="font-semibold text-zinc-900 dark:text-gray-200">
                                        {option.text}
                                    </label>
                                    {option.help &&
                                        <p id={`${option.value}-check-choice-description`} className="text-xs">
                                            {option.help}
                                        </p>
                                    }
                                </div>
                                <div className="ml-3 flex h-6 items-center">
                                    <input
                                        id={`${option.value}-check-choice`}
                                        aria-describedby={`${option.value}-check-choice-description`}
                                        name={`${option.value}-check-choice`}
                                        onChange={(e) => option_updated(option.value, e.target.checked)}
                                        type="checkbox"
                                        className={clsx(error ? error_style : clean_style, "h-4 w-4 rounded drop-shadow-sm border-zinc-300 dark:bg-zinc-400/50 focus:ring-1 focus:ring-offset-0 focus:outline-0")}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </fieldset>
        </div>
    )
}