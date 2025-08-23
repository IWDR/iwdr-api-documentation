import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AuthChecker() {
    const { data: session, status, update } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;

        const callbackUrl = new URL(router.route, process.env.NEXT_PUBLIC_APP_URL);
        const loginUrl = new URL('/login', process.env.NEXT_PUBLIC_APP_URL);
        loginUrl.searchParams.set('callbackUrl', callbackUrl.href);

        if (status === 'unauthenticated') router.push(loginUrl.href);
    }, [status, session]);

    // Polls the session every 1 hour
    useEffect(() => {
        const interval = setInterval(() => update(), 1000 * 60 * 60);

        return () => clearInterval(interval);
    }, [update]);

    // Listen for when the page is visible, if the user switches tabs
    // and makes our tab visible again, re-fetch the session
    useEffect(() => {
        const visibilityHandler = () =>
            document.visibilityState === "visible" && update()
        window.addEventListener("visibilitychange", visibilityHandler, false);

        return () => window.removeEventListener("visibilitychange", visibilityHandler, false);
    }, [update]);

    return <></>;
}