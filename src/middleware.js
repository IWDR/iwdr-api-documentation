import { NextResponse } from 'next/server';
import { NextURL } from 'next/dist/server/web/next-url';

export async function middleware(request) {
    const destination_url = request.nextUrl;
    const login_url = new NextURL('/login', process.env.NEXT_PUBLIC_APP_URL);
    const verify_url = new NextURL('/verify-email', process.env.NEXT_PUBLIC_APP_URL);
    const user_url = new URL('/user-info', process.env.NEXT_PUBLIC_API_URL);

    /**
     * 1. Attempt to fetch user info
     * 2. User retrieved -> continue to page
     * 3. User needs to verify -> redirect to verify email
     * 4. User not authenticated -> redirect to login page
     */

    // Attempt to fetch user info
    try {
        const res = await fetch(user_url, {
            method: 'GET',
            headers: new Headers({
                Cookie: request.headers.get('cookie'),
                'X-XSRF-TOKEN': request.cookies.get('XSRF-TOKEN')?.value ?? '',
                'X-Requested-With': 'XMLHttpRequest',
            }),
            credentials: 'include',
        });

        // User is not authorized
        if (res.status === 401) {
            login_url.searchParams.set('redirect', encodeURIComponent(destination_url.pathname));
            return NextResponse.redirect(login_url);
        }

        // User must verify email
        if (res.status === 409) {
            return NextResponse.redirect(verify_url);
        }

        // User is authenticated
        return NextResponse.next();
    } catch (err) {
        console.log(err);
    }

    return NextResponse.rewrite(new NextURL('/500', process.env.NEXT_PUBLIC_APP_URL));
}

export const config = {
    matcher: [
        '/authentication',
        '/errors',
        '/mapping',
        '/resources/:path*',
        '/support',
        '/testing',
        '/tokens',
        '/token-application',
        '/token-application-review',
    ],
};
