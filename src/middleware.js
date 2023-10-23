export { default } from 'next-auth/middleware';

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
        '/token-application-review-admin',
    ],
};
