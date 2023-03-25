import Link from 'next/link'
import clsx from 'clsx'

function ArrowIcon(props) {
    return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"
            />
        </svg>
    )
}

const variantStyles = {
    primary:
        'rounded shadow bg-emerald-600/10 text-emerald-800/90 ring-1 ring-emerald-600 hover:ring-emerald-400 hover:text-emerald-600/90 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/60 dark:hover:ring-emerald-300 dark:hover:text-emerald-400',
    secondary:
        'rounded shadow bg-zinc-400/40 text-zinc-900 hover:bg-zinc-400/30 dark:text-zinc-100 ring-1 ring-inset ring-zinc-800/20',
    filled:
        'rounded shadow bg-zinc-700 text-white hover:bg-zinc-600 dark:bg-emerald-700 dark:text-white dark:hover:bg-emerald-700/90 dark:hover:ring-2 dark:hover:ring-emerald-400',
    outline:
        'rounded text-zinc-900 border border-zinc-500 bg-zinc-300 hover:bg-zinc-900/15 hover:text-zinc-900 dark:border dark:text-zinc-200 dark:border-zinc-500 dark:bg-zinc-600 dark:hover:bg-zinc-600/40 dark:hover:text-white',
    text: 'text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-500',
}

const sizeStyles = {
    txt: 'p-0 text-sm',
    xs: 'px-2.5 py-1.5 text-xs leading-4',
    sm: 'px-3 py-2 text-sm leading-4',
    md: 'px-4 py-2 text-sm leading-5',
    lg: 'px-4 py-2 text-base leading-6',
    xl: 'px-6 py-3 text-base leading-7',
}

export function Button({
                           variant = 'primary',
                           size = 'sm',
                           className,
                           children,
                           arrow,
                           ...props
                       }) {
    let Component = props.href ? Link : 'button'

    let arrowIcon = (
        <ArrowIcon
            className={clsx(
                'mt-0.5 h-5 w-5',
                variant === 'text' && 'relative top-px',
                arrow === 'left' && '-ml-1 rotate-180 ',
                arrow === 'right' && '-mr-1'
            )}
        />
    )

    return (
        <Component
            className={clsx(
                'inline-flex items-center justify-center gap-0.5 overflow-hidden font-medium transition',
                props.disabled && 'cursor-not-allowed focus:outline-none disabled:opacity-70',
                variantStyles[variant],
                sizeStyles[variant === 'text' ? 'txt' : size],
                className
            )}
            {...props}
        >
            {arrow === 'left' && arrowIcon}
            {children}
            {arrow === 'right' && arrowIcon}
        </Component>
    )
}
