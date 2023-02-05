import clsx from 'clsx'
import { InputError } from './InputError'
import {
  ExclamationCircleIcon,
  ChevronUpDownIcon,
  CheckIcon,
} from '@heroicons/react/20/solid'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'

function RemovableChip({ label, srText, onClick }) {
  return (
    <div className="mr-1.5 mt-1.5 inline-block">
      <span className="inline-flex items-center rounded-full bg-zinc-900 py-0.5 pl-2 pr-1 text-xs font-medium text-white shadow dark:bg-emerald-500/50 dark:text-emerald-300">
        {label}
        <a
          className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-200 hover:bg-zinc-500 hover:text-gray-300 focus:bg-zinc-500 focus:text-gray-300 focus:outline-none dark:text-emerald-400 dark:hover:bg-emerald-400/40"
          onClick={(e) => {
            e.preventDefault()
            onClick()
          }}
        >
          <span className="sr-only">{srText ?? ''}</span>
          <svg
            className="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </a>
      </span>
    </div>
  )
}

export function SelectField({
  id,
  placeholder,
  className,
  label,
  error,
  error_message,
  options,
  value,
  onChange,
  required,
}) {
  const error_style =
    'border-red-500 text-red-500 placeholder-red-500 focus:border-red-900 focus:outline-none focus:ring-red-900'
  const clean_style =
    'border-gray-500 text-zinc-900 focus:border-emerald-300 focus:ring-emerald-300 dark:text-white focus:outline-none'

  const remove = (val_to_remove) => {
    onChange(() => value.filter((val) => val !== val_to_remove))
  }

  return (
    <>
      <Listbox value={value} onChange={onChange} id={id} multiple>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium dark:text-white">
              {label}
            </Listbox.Label>
            <div className="relative mt-1">
              <Listbox.Button
                className={clsx(
                  error ? error_style : clean_style,
                  className,
                  'relative w-full cursor-default rounded-md border pl-3 pr-10 py-3 text-left shadow-sm dark:bg-zinc-900 sm:text-sm'
                )}
              >
                <span className="block truncate whitespace-normal">
                  {(value.length > 0 &&
                    value.map((val) => (
                      <RemovableChip
                        key={val}
                        onClick={() => remove(val)}
                        label={val}
                      />
                    ))) || <span className='text-gray-400'>{placeholder ?? 'Select an option...'}</span>}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  placeholder={placeholder ?? 'Select some options...'}
                  className="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-800 dark:text-white sm:text-sm"
                >
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      className={({ active }) =>
                        clsx(
                          'relative cursor-default select-none py-2 px-3',
                          active
                            ? 'bg-zinc-800/90 text-white dark:bg-emerald-500/90'
                            : ''
                        )
                      }
                      value={option.value}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={clsx(
                              'block truncate',
                              selected && 'font-bold'
                            )}
                          >
                            {option.text}
                          </span>

                          {selected ? (
                            <span
                              className={clsx(
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                                active ? 'text-white' : ''
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      {error && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
      )}
      <InputError error_message={error_message} id={id} />
    </>
  )

  // return (
  //   <>
  //     <div className="relative mt-1 rounded-md shadow-sm">
  //       <Listbox
  //         value={value}
  //         onChange={onChange}
  //         as="div"
  //         multiple
  // className={clsx(
  //   '',
  //   error ? error_style : clean_style,
  //   className
  // )}
  //       >
  //         <Listbox.Label className="block text-sm font-medium text-gray-700 dark:text-white">
  //           {label}
  //         </Listbox.Label>
  //         <div className="relative mt-1">
  //           <Listbox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2">
  //             <ChevronUpDownIcon
  //               className="h-5 w-5 text-gray-400"
  //               aria-hidden="true"
  //             />
  //           </Listbox.Button>
  //           {options.length > 0 && (
  //             <Transition
  //               enter="transition duration-100 ease-out"
  //               enterFrom="transform scale-95 opacity-0"
  //               enterTo="transform scale-100 opacity-100"
  //               leave="transition duration-75 ease-out"
  //               leaveFrom="transform scale-100 opacity-100"
  //               leaveTo="transform scale-95 opacity-0"
  //             >
  // {value.length > 0 &&
  //   value.map((val) => (
  //     <RemovableChip
  //       key={val}
  //       onClick={() => remove(val)}
  //       label={val}
  //     />
  //   ))}
  //               <Listbox.Options className="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-800 dark:text-white sm:text-sm">
  //                 {options.map((option) => (
  //                   <Listbox.Option
  //                     key={option.value}
  //                     value={option.value}
  // className={({ active }) =>
  //   clsx(
  //     'relative cursor-default select-none py-2 px-3',
  //     active
  //       ? 'bg-zinc-800/90 text-white dark:bg-emerald-500/90'
  //       : ''
  //   )
  // }
  //                   >
  //                     {({ active, selected }) => (
  //                       <>
  //                         <span
  // className={clsx(
  //   'block truncate',
  //   selected && 'font-bold'
  // )}
  //                         >
  //                           {option.text}
  //                         </span>
  //                         {selected && (
  //                           <span
  // className={clsx(
  //   'absolute inset-y-0 right-0 flex items-center pr-4',
  //   active ? 'text-white' : ''
  // )}
  //                           >
  //                             <CheckIcon
  //                               className="h-5 w-5"
  //                               aria-hidden="true"
  //                             />
  //                           </span>
  //                         )}
  //                       </>
  //                     )}
  //                   </Listbox.Option>
  //                 ))}
  //               </Listbox.Options>
  //             </Transition>
  //           )}
  //         </div>
  //       </Listbox>
  // {error && (
  //   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
  //     <ExclamationCircleIcon
  //       className="h-5 w-5 text-red-500"
  //       aria-hidden="true"
  //     />
  //   </div>
  // )}
  // <InputError error_message={error_message} id={id} />
  //     </div>
  //   </>
  // )
}
