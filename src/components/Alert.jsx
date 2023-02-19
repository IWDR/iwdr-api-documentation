import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import { useAlertStore } from '@/stores/alertStore'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import clsx from 'clsx'

const variantStlyes = {
  success: 'ring-1 ring-emerald-500/40 bg-emerald-300/90',
  error: 'ring-1 ring-red-500/40 bg-red-300/90',
  warning: 'ring-1 ring-orange-500/40 bg-orange-300/90',
  info: 'ring-1 ring-cyan-500/40 bg-cyan-300/90',
  plain: 'bg-gray-300/90 dark:bg-zinc-600/90',
}

function VariantIcon({ variant }) {
  let classes = 'w-6'

  switch (variant) {
    case 'success':
      return <CheckCircleIcon className={clsx('text-emerald-700', classes)} />
    case 'error':
      return <ExclamationCircleIcon className={clsx('text-red-700', classes)} />
    case 'info':
      return (
        <InformationCircleIcon className={clsx('text-cyan-700', classes)} />
      )
    case 'warning':
      return (
        <ExclamationTriangleIcon className={clsx('text-orange-600', classes)} />
      )
    default:
      return <></>
  }
}

export function Alert() {
  const { open, message, isClosable, variant, clearAlert } = useAlertStore()

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
                variantStlyes[variant]
              )}
            >
              <div className="w-0 flex-1 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <VariantIcon variant={variant} />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p
                      className={clsx(
                        'break-all',
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
                  className={clsx(
                    'mr-2 mt-2 text-zinc-700 hover:text-zinc-700/90',
                    variant === 'plain' && 'dark:text-gray-100'
                  )}
                  onClick={() => clearAlert()}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="w-6" />
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}
