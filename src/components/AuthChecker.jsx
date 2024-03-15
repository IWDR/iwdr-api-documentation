import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AuthChecker() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;

        const callbackUrl = new URL(router.route, process.env.NEXT_PUBLIC_APP_URL);
        const loginUrl = new URL('/login', process.env.NEXT_PUBLIC_APP_URL);
        loginUrl.searchParams.set('callbackUrl', callbackUrl.href);

        if (!session?.user?.access_token) router.push(loginUrl.href);
    }, [status, session]);

    return <></>;
}
