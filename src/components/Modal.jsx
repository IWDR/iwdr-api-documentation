import {Transition, Dialog} from '@headlessui/react'
import {Fragment} from 'react'
import clsx from 'clsx'
import CloseIcon from "@/components/icons/CloseIcon";
import {Prose} from "@/components/Prose";

export function Modal({open, openModifier, closable, children, className}) {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={openModifier}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-zinc-900 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-40 overflow-y-auto">
                    <div className="mx-auto min-h-full max-w-4xl p-2 sm:p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className={clsx(
                                    'transform rounded-lg bg-gray-50 text-left shadow-xl transition-all dark:bg-zinc-800 p-2',
                                    className
                                )}
                            >
                                <button
                                    type="button"
                                    onClick={() => openModifier(false)}
                                    className="rounded-full p-1 absolute top-4 right-4 hover:opacity-90 bg-zinc-400/50 shadow"
                                >
                                    <CloseIcon className="h-4 w-4 fill-zinc-900 dark:fill-zinc-100"/>
                                </button>
                                <Prose className="p-6 w-full printable">
                                    {children}
                                </Prose>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
