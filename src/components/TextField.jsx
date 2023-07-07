import { InputError } from './InputError';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useAlertStore } from '@/stores/alertStore';
import { ClipboardIcon } from '@/components/icons/ClipboardIcon';

function CopyButton({ code }) {
    let [copyCount, setCopyCount] = useState(0);
    let copied = copyCount > 0;

    const showAlert = useAlertStore((state) => state.showAlert);

    useEffect(() => {
        if (copyCount > 0) {
            let timeout = setTimeout(() => setCopyCount(0), 1000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [copyCount]);

    return (
        <button
            type="button"
            className={clsx(
                'group/button absolute top-2.5 right-4 rounded-full py-1 pl-2 pr-3 text-2xs font-medium shadow-sm transition hover:opacity-100 focus:opacity-100 group-hover:opacity-100',
                copied
                    ? 'bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20'
                    : 'bg-emerald-600/10 text-emerald-800/90 ring-1 ring-emerald-600 hover:text-emerald-600/90 hover:ring-emerald-400 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/60 dark:hover:text-emerald-400 dark:hover:ring-emerald-300'
            )}
            onClick={() => {
                window.navigator.clipboard
                    .writeText(code)
                    .then(() => {
                        setCopyCount((count) => count + 1);
                    })
                    .catch(() =>
                        showAlert(
                            'There was an issue copying the data to the clipboard. You may need to allow permission for this action.',
                            'error',
                            true,
                            6000
                        )
                    );
            }}
        >
            <span
                aria-hidden={copied}
                className={clsx(
                    'pointer-events-none flex items-center gap-0.5 transition duration-300',
                    copied && '-translate-y-1.5 opacity-0'
                )}
            >
                <ClipboardIcon className="h-5 w-5 fill-emerald-800/90 stroke-emerald-800/90 hover:fill-emerald-600/90 hover:stroke-emerald-600/90" />
                Copy
            </span>
            <span
                aria-hidden={!copied}
                className={clsx(
                    'pointer-events-none absolute inset-0 flex items-center justify-center text-emerald-400 transition duration-300',
                    !copied && 'translate-y-1.5 opacity-0'
                )}
            >
                Copied!
            </span>
        </button>
    );
}
export function TextField({
    name,
    type,
    id,
    placeholder,
    onChange,
    className,
    label,
    value,
    error,
    error_message,
    help,
    readonly = false,
    disabled = false,
    required = false,
    horizontal = false,
    copyable,
}) {
    const error_style = 'border-red-500 text-red-500 focus:border-red-900 focus:outline-none focus:ring-red-900';
    const clean_style = 'border-zinc-500 text-zinc-900 focus:border-emerald-300 focus:ring-emerald-300 dark:text-white';
    const readonly_style = 'disabled:cursor-text disabled:border-zinc-500 disabled:bg-zinc-100 disabled:text-zinc-500';

    return (
        <div className={clsx(className, horizontal && 'sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5')}>
            <div>
                <label htmlFor={name} className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-white">
                    {label}
                    {required && <span className="ml-0.5 text-red-600">*</span>}
                    {help && (
                        <p className="my-0.5 max-w-sm text-sm font-normal text-zinc-500 dark:text-zinc-300/80">
                            {help}
                        </p>
                    )}
                </label>
                {error && <InputError error_message={error_message} id={id} />}
            </div>
            <div className={clsx(horizontal ? 'mt-2 sm:col-span-2 sm:mt-0' : 'mt-1 flex')}>
                <div className="relative flex max-w-lg flex-grow rounded-md shadow-sm">
                    <input
                        type={type}
                        name={name}
                        id={id}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e)}
                        readOnly={readonly}
                        disabled={readonly || disabled}
                        className={clsx(
                            'bg-transparent block w-full rounded-md border p-3 shadow-sm focus-visible:outline-none dark:bg-zinc-900 dark:placeholder:text-zinc-400 sm:text-sm',
                            copyable && 'cursor-pointer',
                            error ? error_style : clean_style,
                            (readonly || disabled) && readonly_style
                        )}
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error_message ?? undefined}
                        required={required}
                    />
                    {copyable && <CopyButton code={value} />}
                    {error && (
                        <div
                            className={clsx(
                                type === 'date' ? 'right-6' : 'right-0',
                                'pointer-events-none absolute inset-y-0 flex items-center pr-3'
                            )}
                        >
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
