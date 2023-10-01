import Link from 'next/link';
import clsx from 'clsx';

export function TopLevelNavItem({ href, children, className, listClass }) {
    return (
        <li className={clsx(listClass)}>
            <Link
                href={href}
                className={clsx(
                    'text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
                    className
                )}
                prefetch={false}
            >
                {children}
            </Link>
        </li>
    );
}
