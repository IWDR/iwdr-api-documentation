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

const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', 'md'],
    headers: () => [
        {
            source: '/resources/:path*',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store'
                }
            ]
        },
        {
            source: '/login',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store'
                }
            ]
        },
        {
            source: '/tokens',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store'
                }
            ]
        },
        {
            source: '/token-application',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store'
                }
            ]
        },
        {
            source: '/authentication',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store'
                }
            ]
        },
        {
            source: '/mapping',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store'
                }
            ]
        },
        {
            source: '/errors',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store'
                }
            ]
        },
    ]
}

export default withMDX(nextConfig)
