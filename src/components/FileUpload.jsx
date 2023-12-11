import { PaperClipIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { forwardRef, useImperativeHandle } from 'react';

// eslint-disable-next-line react/display-name
export const FileUpload = forwardRef(
    ({ id, name, multiple, accept, placeholder, error, readonly, disabled, label, onChange }, ref) => {
        const clean_style =
            'border-zinc-500 text-zinc-900 focus:border-emerald-300 focus:ring-emerald-300 dark:text-white';
        const readonly_style =
            'disabled:cursor-text disabled:border-zinc-500 disabled:bg-zinc-100 disabled:text-zinc-500';
        const error_style = 'border-red-500 text-red-500 focus:border-red-900 focus:outline-none focus:ring-red-900';

        const reset = () => {
            const text = document.getElementById('iwdr_fu-placeholder');
            text.files = '';
            text.innerText = placeholder;
        };

        useImperativeHandle(ref, () => ({ reset }));

        const handleFileUpload = (e) => {
            const uploadedFiles = [];
            const text = document.getElementById('iwdr_fu-placeholder');
            const files = e.target.files;
            console.log(files);

            for (const file of files) {
                const file_reader = new FileReader();
                const file_name = file.name;

                file_reader.addEventListener('load', () => {
                    const uploadedFile = {};
                    uploadedFile[file_name] = file_reader.result;
                    uploadedFiles.push(uploadedFile);
                });

                file_reader.addEventListener('loadend', () => {
                    onChange(uploadedFiles);
                });

                file_reader.readAsDataURL(file);

                // Build selected files string
                if (files.item(0).name === file.name) {
                    text.innerText = file.name;
                } else {
                    text.innerText += `, ${file.name}`;
                }
            }
        };

        return (
            <div>
                <div className="font-semibold text-zinc-900 dark:text-white">{label}</div>
                <div className={clsx('relative flex max-w-lg flex-grow rounded-md shadow-sm')}>
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <PaperClipIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <label
                        className={clsx(
                            'block w-full cursor-pointer rounded-md border p-3 pl-10 shadow-sm hover:border-emerald-300 dark:bg-zinc-900 dark:text-zinc-400 sm:text-sm',
                            error ? error_style : clean_style,
                            (readonly || disabled) && readonly_style
                        )}
                    >
                        <input
                            type="file"
                            name={name}
                            id={id}
                            ref={ref}
                            className="sr-only"
                            multiple={multiple}
                            accept={accept}
                            onChange={(e) => handleFileUpload(e)}
                        />
                        <div id="iwdr_fu-placeholder">{placeholder}</div>
                    </label>
                </div>
            </div>
        );
    }
);
