import clsx from 'clsx';

export function TextArea({
    name,
    id,
    label,
    value,
    error,
    error_message,
    rows = 1,
    readonly = false,
    disabled = false,
    onChange,
}) {
    const error_style = 'border-red-500 text-red-500 focus:border-red-900 focus:outline-none focus:ring-red-900';
    const clean_style = 'border-zinc-500 text-zinc-900 focus:border-emerald-300 focus:ring-emerald-300 dark:text-white';
    const readonly_style =
        'disabled:cursor-default disabled:border-zinc-500 disabled:bg-transparent disabled:text-zinc-500 disabled:dark:bg-transparent';

    return (
        <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:pt-5">
            <div>
                <label htmlFor={name} className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-white">
                    {label}
                </label>
            </div>
            <div className="mt-2 sm:col-span-1 sm:mt-0">
                <div className="relative flex max-w-lg flex-grow rounded-md">
                    <textarea
                        name={name}
                        id={id}
                        value={value}
                        rows={rows}
                        onChange={(e) => onChange(e)}
                        readOnly={readonly}
                        disabled={disabled}
                        className={clsx(
                            'block min-h-fit w-full resize-none rounded-md border focus-visible:outline-none dark:bg-zinc-900 dark:text-zinc-400 sm:text-sm p-0',
                            error ? error_style : clean_style,
                            (readonly || disabled) && readonly_style
                        )}
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error_message ?? undefined}
                    />
                </div>
            </div>
        </div>
    );
}
