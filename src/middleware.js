export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        '/authentication',
        '/errors',
        '/mapping',
        '/resources/:path*',
        '/support',
        '/testing',
        '/token-application',
    ],
};
