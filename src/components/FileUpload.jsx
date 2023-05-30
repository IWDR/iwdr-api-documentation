import {PaperClipIcon} from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function FileUpload({id, name, multiple, placeholder, error, readonly, disabled, label}) {
    const clean_style = 'border-zinc-500 text-zinc-900 focus:border-emerald-300 focus:ring-emerald-300 dark:text-white'
    const readonly_style = 'disabled:cursor-text disabled:border-zinc-500 disabled:bg-zinc-100 disabled:text-zinc-500'
    const error_style = 'border-red-500 text-red-500 focus:border-red-900 focus:outline-none focus:ring-red-900'

    return (
        <>
            <div className={"dark:text-white text-zinc-900 font-semibold"}>
                {label}
            </div>
            <div className={clsx("relative flex max-w-lg flex-grow rounded-md shadow-sm")}>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <PaperClipIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                </div>
                <label className={clsx(
                    'pl-10 block w-full border p-3 shadow-sm rounded-md focus-visible:outline-none dark:bg-zinc-900 sm:text-sm dark:text-zinc-400',
                    error ? error_style : clean_style,
                    (readonly || disabled) && readonly_style,
                )}>
                    <input
                        type="file"
                        name={name}
                        id={id}
                        className={"sr-only"}
                        multiple={multiple}
                    />
                    {placeholder}
                </label>
            </div>
        </>
    );
}