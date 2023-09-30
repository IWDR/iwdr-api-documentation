import nextMDX from '@next/mdx'
import {remarkPlugins} from './mdx/remark.mjs'
import {rehypePlugins} from './mdx/rehype.mjs'
import {recmaPlugins} from './mdx/recma.mjs'

const withMDX = nextMDX({
    options: {
        providerImportSource: '@mdx-js/react',
        remarkPlugins,
        rehypePlugins,
        recmaPlugins,
    },
})

const noCacheHeaders = [
    {
        key: 'Cache-Control',
        value: 'no-store'
    }
]

const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', 'md'],
    headers() {
        return [
            {
                source: "/api/auth/:path*",
                headers: [
                    {key: "Access-Control-Allow-Credentials", value: "true"},
                    {key: "Access-Control-Allow-Origin", value: "*"},
                    {key: "Access-Control-Allow-Methods", value: "GET, DELETE, PATCH, POST, PUT"},
                ]
            },
            {
                source: "/resources/:path*",
                headers: noCacheHeaders
            },
            {
                source: '/authentication',
                headers: noCacheHeaders
            },
            {
                source: '/errors',
                headers: noCacheHeaders
            },
            {
                source: '/mapping',
                headers: noCacheHeaders
            },
            {
                source: '/support',
                headers: noCacheHeaders
            },
            {
                source: '/testing',
                headers: noCacheHeaders
            },
            {
                source: '/tokens',
                headers: noCacheHeaders
            },
            {
                source: '/token-application',
                headers: noCacheHeaders
            },
            {
                source: '/token-application-review',
                headers: noCacheHeaders
            }
        ]
    }
}

export default withMDX(nextConfig)
