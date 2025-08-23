import { forwardRef, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { motion, useScroll, useTransform } from 'framer-motion';

import { IWDRLogo } from '@/components/IWDRLogo';
import { MobileNavigation, useIsInsideMobileNavigation, useMobileNavigationStore } from '@/components/MobileNavigation';
import { ModeToggle } from '@/components/ModeToggle';
import { MobileSearch, Search } from '@/components/Search';
import { TopLevelNavItem } from '@/components/TopLevelNavItem';
import SignInOutButton from './SignInOutButton';
import { useSession } from 'next-auth/react';

export const Header = forwardRef(function Header({ className }, ref) {
    const { data: session, status } = useSession();
    let { isOpen: mobileNavIsOpen } = useMobileNavigationStore();
    let isInsideMobileNavigation = useIsInsideMobileNavigation();

    let { scrollY } = useScroll();
    let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9]);
    let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8]);

    const adminMenuItems = [{ name: 'API Applications', href: '/token-application-review-admin' }];

    useEffect(() => {
        console.log(session);
    }, [session, status]);

    if (status === 'loading') return <p>Loading...</p>;

    return (
        <motion.div
            ref={ref}
            className={clsx(
                className,
                'fixed inset-x-0 top-0 z-10 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-10 lg:px-8 xl:left-80',
                !isInsideMobileNavigation && 'backdrop-blur-sm dark:backdrop-blur lg:left-72 xl:left-80',
                isInsideMobileNavigation
                    ? 'bg-white dark:bg-zinc-900'
                    : 'bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]'
            )}
            style={{
                '--bg-opacity-light': bgOpacityLight,
                '--bg-opacity-dark': bgOpacityDark,
            }}
        >
            <div
                className={clsx(
                    'absolute inset-x-0 top-full h-px transition',
                    (isInsideMobileNavigation || !mobileNavIsOpen) && 'bg-zinc-900/7.5 dark:bg-white/7.5'
                )}
            />
            <div className="hidden lg:block lg:max-w-md lg:flex-auto" />
            <div className="flex items-center gap-5 lg:hidden">
                <MobileNavigation />
                <Link href="/" aria-label="Home">
                    <IWDRLogo className="w-16" />
                </Link>
            </div>
            <div className="flex items-center gap-5">
                <nav className="hidden md:block">
                    <ul role="list" className="flex items-center gap-8">
                        <TopLevelNavItem
                            href="/token-application"
                            className={clsx('text-sm leading-5', !Boolean(session) && 'hidden')}
                        >
                            API Access Application
                        </TopLevelNavItem>
                        <TopLevelNavItem
                            href="/support"
                            className={clsx('text-sm leading-5', !Boolean(session) && 'hidden')}
                        >
                            API Support
                        </TopLevelNavItem>
                    </ul>
                </nav>
                <div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
                <div className="flex gap-4">
                    <MobileSearch />
                    <ModeToggle />
                </div>
                <div className="hidden min-[416px]:contents">
                    <SignInOutButton />
                </div>
            </div>
        </motion.div>
    );
});