import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { useAlertStore } from '@/stores/alertStore';
import clsx from 'clsx';
import VariantIcon from '@/components/icons/VariantIcon';
import CloseIcon from '@/components/icons/CloseIcon';

const variantStyles = {
    success: 'ring-1 ring-emerald-500/40 bg-emerald-300/90',
    error: 'ring-1 ring-red-500/40 bg-red-300/90',
    warning: 'ring-1 ring-orange-500/40 bg-orange-300/90',
    info: 'ring-1 ring-cyan-500/40 bg-cyan-300/90',
    plain: 'bg-gray-300/90 dark:bg-zinc-600/90',
}

export function Alert() {
    const {open, message, isClosable, variant, clearAlert} = useAlertStore()

    return (
        <>
            {/* Global notification live region, render this permanently at the end of the document */}
            <div
                aria-live="assertive"
                className="pointer-events-none fixed inset-0 z-50 flex items-start px-4 py-6 max-sm:items-start sm:p-6"
            >
                <div className="flex w-full flex-col items-end space-y-4 max-sm:items-start">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition
                        show={open}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-x-2 opacity-0"
                        enterTo="translate-x-0 opacity-100"
                        leave="transition ease-in duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className={clsx(
                                'pointer-events-auto flex w-full rounded-lg shadow-lg sm:max-w-sm md:max-w-md',
                                variantStyles[variant]
                            )}
                        >
                            <div className="w-0 flex-1 p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <VariantIcon variant={variant}/>
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p
                                            className={clsx(
                                                'break-words',
                                                variant === 'plain' && 'dark:text-gray-200'
                                            )}
                                        >
                                            {message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={clsx(isClosable || 'hidden', 'sticky top-0 right-0')}
                            >
                                <button
                                    type="button"
                                    onClick={() => clearAlert()}
                                    className="rounded-full p-1 m-2 hover:opacity-90 bg-zinc-400/50 shadow"
                                >
                                    <span className="sr-only">Close</span>
                                    <CloseIcon className="w-4 fill-zinc-900 dark:fill-zinc-900"/>
                                </button>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    )
}
