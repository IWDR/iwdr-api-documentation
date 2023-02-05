import { InputError } from './InputError'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/20/solid'
import { Button } from './Button'
import { ClipboardIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useAlertStore } from '@/lib/stores/alertStore'
import { useState } from 'react'
import { Transition } from '@headlessui/react'

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
  readonly = false,
  copyable,
}) {
  const error_style =
    'border-red-500 text-red-500 placeholder-red-500 focus:border-red-900 focus:outline-none focus:ring-red-900'
  const clean_style =
    'border-zinc-500 text-zinc-900 focus:border-emerald-300 focus:ring-emerald-300 dark:text-white'
  const readonly_style =
    'disabled:cursor-text disabled:border-zinc-500 disabled:bg-zinc-100 disabled:text-zinc-500'

  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
  }

  return (
    <div className={clsx(className)}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-zinc-900 dark:text-white"
      >
        {label}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e)}
            readOnly={readonly}
            disabled={readonly}
            className={clsx(
              'cur block w-full border p-3 shadow-sm focus-visible:outline-none dark:bg-zinc-900 sm:text-sm',
              copyable ? 'rounded-l-md border-r-0' : 'rounded-md',
              error ? error_style : clean_style,
              readonly && readonly_style
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error_message ?? undefined}
          />
          {copyable && (
            <Button
              className="relative -ml-px inline-flex items-center rounded-l-none"
              variant="outline"
              onClick={() => copy()}
            >
              <Transition
                show={copied}
                enter="ease-out duration-300 transform"
                enterFrom="rotate-0 scale-0"
                enterTo="rotate-360 scale-100"
                leave="ease-in duration-300 transform"
                leaveFrom="rotate-360 scale-100"
                leaveTo="rotate-0 scale-0"
              >
                <CheckCircleIcon
                  className="h-5 w-5 text-emerald-500"
                  aria-hidden="true"
                />
              </Transition>
              <ClipboardIcon
                className={clsx(copied && 'hidden', 'h-6 w-6')}
                aria-hidden="true"
              />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </Button>
          )}
          {error && (
            <div className="rot pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </div>

      <InputError error_message={error_message} id={id} />
    </div>
  )
}
