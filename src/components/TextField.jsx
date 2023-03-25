import {InputError} from './InputError'
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/20/solid'
import {Button} from './Button'
import {ClipboardIcon} from '@heroicons/react/20/solid'
import clsx from 'clsx'
import {useState} from 'react'
import {Transition} from '@headlessui/react'
import {useAlertStore} from "@/stores/alertStore";

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
    const error_style =
        'border-red-500 text-red-500 focus:border-red-900 focus:outline-none focus:ring-red-900'
    const clean_style =
        'border-zinc-500 text-zinc-900 focus:border-emerald-300 focus:ring-emerald-300 dark:text-white'
    const readonly_style =
        'disabled:cursor-text disabled:border-zinc-500 disabled:bg-zinc-100 disabled:text-zinc-500'

    const [copied, setCopied] = useState(false)
    const showAlert = useAlertStore((state) => state.showAlert)

    const copy = () => {
        navigator.clipboard.writeText(value).catch(() => showAlert("There was an issue copying the data to the clipboard. You may need to allow permission for this action.", 'error', true, 6000))
        setCopied(true)
    }

    return (
        <div className={clsx(className, horizontal && "sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5")}>
            <div>
                <label
                    htmlFor={name}
                    className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-white"
                >
                    {label}
                    {required && <span className="text-red-600 ml-0.5">*</span>}
                    {help && <p className="text-sm font-medium max-w-sm my-0.5">{help}</p>}
                </label>
                {error && <InputError error_message={error_message} id={id}/>}
            </div>
            <div className={clsx(horizontal ? "mt-2 sm:col-span-2 sm:mt-0" : "mt-1 flex")}>
                <div
                    className="relative flex max-w-lg flex-grow items-stretch focus-within:z-10 rounded-md shadow-sm">
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
                            'block w-full border p-3 shadow-sm focus-visible:outline-none dark:bg-zinc-900 sm:text-sm dark:placeholder:text-zinc-400',
                            copyable ? 'cursor-pointer rounded-l-md border-r-0' : 'rounded-md',
                            error ? error_style : clean_style,
                            (readonly || disabled) && readonly_style,
                        )}
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error_message ?? undefined}
                        required={required}
                    />
                    {copyable && (
                        <Button
                            className="relative -ml-px inline-flex items-center rounded-l-none"
                            variant="outline"
                            onClick={() => copy()}
                        >
                            <Transition
                                show={copied}
                                enter="ease-in duration-400 transform"
                                enterFrom="rotate-0 scale-0"
                                enterTo="rotate-360 scale-100"
                            >
                                <CheckCircleIcon
                                    className="h-5 w-5 text-emerald-500"
                                    aria-hidden="true"
                                />
                            </Transition>
                            <Transition
                                show={!copied}
                                leave="transition-opacity duration-0"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <ClipboardIcon className="h-5 w-5" aria-hidden="true"/>
                            </Transition>
                            <span>{copied ? 'Copied!' : 'Copy'}</span>
                        </Button>
                    )}
                    {error && (
                        <div
                            className={clsx(type === "date" ? "right-6" : "right-0", "pointer-events-none absolute inset-y-0 flex items-center pr-3")}>
                            <ExclamationCircleIcon
                                className="h-5 w-5 text-red-500"
                                aria-hidden="true"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
