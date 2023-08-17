import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

export function TextArea({
    name,
    id,
    label,
    value,
    error,
    error_message,
    rows = 1,
    readonly = false,
    disabled = false,
    onChange,
    placeholder,
    isVisible = true,
    className,
}) {
    const error_style = 'border-red-500 text-red-500 focus:border-red-900 focus:outline-none focus:ring-red-900';
    const clean_style = 'border-zinc-500 text-zinc-900 focus:border-emerald-300 focus:ring-emerald-300 dark:text-white';
    const readonly_style =
        'disabled:cursor-default disabled:border-zinc-500 disabled:bg-zinc-100 disabled:text-zinc-500';

    const [textareaHeight, setTextareaHeight] = useState('auto');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (isVisible ?? textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const newHeight = textareaRef.current.scrollHeight + 'px';
            setTextareaHeight(newHeight);
            textareaRef.current.style.height = newHeight;
        }
    }, [value, isVisible]);

    return (
        <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:pt-5">
            <div>
                <label htmlFor={name} className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-white">
                    {label}
                </label>
            </div>
            <div className="mt-2 sm:col-span-1 sm:mt-0">
                <div className="relative flex max-w-lg flex-grow rounded-md">
                    <textarea
                        ref={textareaRef}
                        name={name}
                        id={id}
                        value={value}
                        rows={rows}
                        onChange={(e) => onChange(e)}
                        style={{ height: isVisible ? textareaHeight : 'auto' }}
                        readOnly={readonly}
                        disabled={disabled}
                        className={clsx(
                            className,
                            'block h-fit w-full resize-none rounded-md border p-3 focus-visible:outline-none dark:bg-zinc-900 sm:text-sm',
                            error ? error_style : clean_style,
                            (readonly || disabled) && readonly_style
                        )}
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error_message ?? undefined}
                        placeholder={placeholder}
                    />
                </div>
            </div>
        </div>
    );
}
