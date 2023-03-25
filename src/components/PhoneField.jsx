import {InputError} from './InputError'
import {
    CheckIcon,
    ChevronUpDownIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/20/solid'
import clsx from 'clsx'
import {Fragment, useEffect, useState} from 'react'
import useSWR from "swr";
import {Listbox, Transition} from "@headlessui/react";
import {useGeolocation} from "@/hooks/geolocation";
import axios from "@/lib/axios";

export function PhoneField({
                               name,
                               id,
                               placeholder,
                               onChange,
                               className,
                               label,
                               error,
                               error_message,
                               help,
                               readonly = false,
                               disabled = false,
                               required = false,
                               horizontal = false,
                               copyable,
                           }) {
    const {location} = useGeolocation();
    const error_style =
        'border-red-500 text-red-500 focus:border-red-900 focus:outline-none focus:ring-red-900'
    const clean_style =
        'border-zinc-500 text-zinc-900 focus:border-emerald-300 focus:ring-emerald-300 dark:text-white'
    const readonly_style =
        'disabled:cursor-text disabled:border-zinc-500 disabled:bg-zinc-100 disabled:text-zinc-500'

    const [country_code, setCountryCode] = useState('US');
    const [phone_number, setPhoneNumber] = useState('');

    const {
        data: country_codes,
        error: country_code_error,
    } = useSWR('/api/country-codes', (url) => fetch(url).then((res) => res.json()));

    const getDialCodeFromCountry = (country) => {
        return country_codes?.filter((code) => code.code === country)[0]?.dial_code;
    }

    // Geolocate the phone code
    useEffect(() => {
        if (!!location) {
            if (location.code === 1) return;

            let lat = location.coords.latitude;
            let lng = location.coords.longitude;

            axios.post('/api/geolocate', { lat, lng })
                .then((res) => {
                    if (res.status !== 200) return;
                    let data = res.data.data;
                    let results = data.results;

                    if (!results) return;
                    for (const add of results) {
                        let components = add.address_components;
                        components.forEach((piece) => {
                            let types = piece.types;
                            if (types.findIndex((val) => val === "country") > -1) {
                                setCountryCode(piece.short_name);
                            }
                        });
                    }
                });
        }
    }, [location]);

    // Update the parent value with country code as prefix to phone number
    useEffect(() => {
        const numberUpdated = () => {
            let dial_code = getDialCodeFromCountry(country_code);
            onChange(`${dial_code}${phone_number}`)
        }
        numberUpdated()

        return () => onChange(country_code)
    }, [country_code, phone_number]);

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
                    className="relative flex max-w-lg flex-grow items-stretch focus-within:z-10 rounded-md shadow-sm not-prose">
                    <Listbox
                        value={country_code}
                        onChange={setCountryCode}
                        defaultValue={country_code}
                    >
                        {({open}) => (
                            <>
                                <Listbox.Label className="sr-only">Country</Listbox.Label>
                                <Listbox.Button className="absolute inset-y-0 left-0 flex items-center pl-3 w-28">
                                    <span className="block truncate">
                                        {country_code + ` (${getDialCodeFromCountry(country_code)})`}
                                    </span>
                                    <span
                                        className="pointer-events-none absolute inset-y-0 left-3/4 flex items-center"
                                    >
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    show={open}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options
                                        className="absolute z-10 mt-14 max-h-60 w-2/6 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-800 dark:text-white sm:text-sm">
                                        {!country_code_error && country_codes.sort((a, b) => a.code > b.code).map((code) =>
                                            <Listbox.Option
                                                key={code.code}
                                                value={code.code}
                                                className={({active}) =>
                                                    clsx(
                                                        'relative cursor-default select-none py-2 px-3 min-w-full',
                                                        active
                                                            ? 'bg-zinc-800/90 text-white dark:bg-emerald-500/90'
                                                            : ''
                                                    )
                                                }
                                            >
                                                {({selected, active}) => (
                                                    <Fragment>
                                                    <span
                                                        className={clsx(
                                                            'block truncate',
                                                            selected && 'font-bold'
                                                        )}
                                                    >
                                                    {code.code + ` (${code.dial_code})`}
                                                    </span>

                                                        {selected &&
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
                                                        }
                                                    </Fragment>
                                                )}

                                            </Listbox.Option>
                                        )}
                                    </Listbox.Options>
                                </Transition>
                            </>
                        )}
                    </Listbox>
                    <input
                        type="tel"
                        name={name}
                        id={id}
                        placeholder={placeholder}
                        value={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        readOnly={readonly}
                        disabled={readonly || disabled}
                        className={clsx(
                            'block w-full border py-3 pr-3 pl-28 shadow-sm focus-visible:outline-none dark:bg-zinc-900 sm:text-sm dark:placeholder:text-zinc-400',
                            copyable ? 'cursor-pointer rounded-l-md border-r-0' : 'rounded-md',
                            error ? error_style : clean_style,
                            (readonly || disabled) && readonly_style,
                        )}
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error_message ?? undefined}
                        required={required}
                    />
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
        </div>
    )
}
