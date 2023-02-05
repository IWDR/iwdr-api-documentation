import { Transition, Dialog } from '@headlessui/react'
import { useState, Fragment } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'

export function ActionPanel({
  open,
  setOpen,
  onClose,
  title,
  subtitle,
  children,
}) {
  const close = () => {
    setOpen(false)

    if (typeof onClose === 'function') {
      onClose()
    }
  }

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog as="div" className="relative z-50" open={open} onClose={setOpen}>
        <Transition.Child>
          {/* Overlay */}
          <div className="fixed inset-0 flex h-full w-screen overflow-y-auto bg-zinc-900/75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center px-4 pt-4 md:pt-40">
            <Dialog.Panel className="pointer-events-auto relative flex rounded-lg drop-shadow-lg max-sm:max-w-full">
              <div className="rounded-lg bg-white ring-1 ring-zinc-300 dark:bg-zinc-800/90 dark:text-gray-200 dark:ring-emerald-300/75">
                <div className="absolute top-0 right-0 pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-full bg-none text-gray-400 hover:bg-zinc-800 hover:ring-1 hover:ring-zinc-400/90 focus:outline-none focus:ring-1 focus:ring-zinc-400/90 dark:bg-zinc-800 dark:text-white hover:dark:bg-emerald-400 hover:dark:text-emerald-100 hover:dark:ring-emerald-300 focus:dark:ring-emerald-300"
                    onClick={() => close()}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    {title}
                  </Dialog.Title>
                  {subtitle && (
                    <div className="mt-2 max-w-xl text-sm">
                      <Dialog.Description as="p">{subtitle}</Dialog.Description>
                    </div>
                  )}
                  <div className="mt-2">{children}</div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
