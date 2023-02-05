import { Transition } from '@headlessui/react'
import { Fragment } from 'react'

export function InputError({ id, error_message }) {
  return (
    <Transition
      show={!!error_message}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <p className="mt-2 text-sm text-red-500" id={id + '-error'}>
        {error_message}
      </p>
    </Transition>
  )
}
