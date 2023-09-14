import clsx from 'clsx';
import { InputError } from '@/components/InputError';

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
    disabled = false,
}) {
    const clean_style =
        'text-emerald-500 focus:ring-emerald-500 dark:bg-zinc-400/50 checked:bg-emerald-500 dark:checked:bg-emerald-500';
    const error_style = 'text-red-500 focus:ring-red-500 checked:bg-red-500 dark:checked:bg-red-500';
    const disabled_style = 'disabled:bg-zinc-200 disabled:checked:bg-emerald-500 disabled:dark:bg-zinc-400';

    return (
        <>
            {error && <InputError error_message={error_message} id={`${id}-error`} />}
            <div className="relative flex items-start">
                <div className={clsx(className, 'flex h-6 items-center')}>
                    <input
                        id={id}
                        name={name}
                        aria-describedby={`${id}-description`}
                        className={clsx(
                            error ? error_style : clean_style,
                            disabled ? disabled_style : null,
                            'h-4 w-4 rounded border-zinc-300 drop-shadow-sm focus:outline-0 focus:ring-1 focus:ring-offset-0'
                        )}
                        type="checkbox"
                        value={value ? 'on' : 'off'}
                        checked={value}
                        onChange={(e) => onChange(e)}
                        required={required}
                        disabled={disabled}
                    />
                </div>
                <div className="ml-3 text-sm leading-6 dark:text-white">
                    <label htmlFor={id}>
                        {label ?? children}
                        {required && <span className="dark:text ml-0.5 text-red-600">*</span>}
                    </label>
                    <p
                        id={`${id}-description`}
                        className="my-0.5 text-sm font-normal text-zinc-500 dark:text-zinc-300/80"
                    >
                        {help}
                    </p>
                </div>
            </div>
        </>
    );
}
