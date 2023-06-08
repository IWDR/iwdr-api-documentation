import clsx from "clsx";
import {InputError} from "@/components/InputError";

export default function CheckboxField({
                                          id,
                                          name,
                                          label,
                                          required,
                                          help,
                                          value,
                                          error,
                                          error_message,
                                          onChange,
                                          className,
                                          children,
                                          disabled = false
                                      }) {
    const clean_style = "text-emerald-500 focus:ring-emerald-500 checked:bg-emerald-500 dark:checked:bg-emerald-500";
    const error_style = "text-red-500 focus:ring-red-500 checked:bg-red-500 dark:checked:bg-red-500";
    const disabled_style = "disabled:bg-zinc-300 disabled:checked:bg-emerald-500";

    return (
        <>
            {error && <InputError error_message={error_message} id={`${id}-error`}/>}
            <div className="relative flex items-start">
                <div className={clsx(className, "flex h-6 items-center")}>
                    <input
                        id={id}
                        name={name}
                        aria-describedby={`${id}-description`}
                        className={clsx(error ? error_style : clean_style,
                            disabled ? disabled_style : null,
                            "h-4 w-4 rounded drop-shadow-sm border-zinc-300 dark:bg-zinc-400/50 focus:ring-1 focus:ring-offset-0 focus:outline-0")}
                        type="checkbox"
                        value={value ? 'on' : 'off'}
                        checked={value}
                        onChange={(e) => onChange(e)}
                        required={required}
                        disabled={disabled}
                    />
                </div>
                <div className="ml-3 text-sm leading-6">
                    <label htmlFor={id}>
                        {label ?? children}
                        {required && <span className="text-red-600 ml-0.5">*</span>}
                    </label>
                    <p id={`${id}-description`}>
                        {help}
                    </p>
                </div>
            </div>
        </>

    )
}