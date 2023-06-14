import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

export default function FlyoutMenuSimple({ className, label, menuItems }) {
    return (
        <div className={clsx(className)}>
            <Popover className="relative">
                <Popover.Button className="inline-flex items-center gap-x-1 text-sm leading-6 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                    <span>{label}</span>
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </Popover.Button>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
                        <div className="w-56 shrink rounded-xl p-4 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                            {menuItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="block p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </div>
    );
}
