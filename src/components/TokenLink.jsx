import { TopLevelNavItem } from './TopLevelNavItem';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';

export default function TokenLink({ className, listClass }) {
    const { data: session } = useSession();

    return (
        <TopLevelNavItem
            className={clsx(className, !Boolean(session?.user) && 'hidden')}
            listClass={listClass}
            href="/tokens"
        >
            Tokens
        </TopLevelNavItem>
    );
}
