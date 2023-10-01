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
});

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
        ]
    }
}

export default withMDX(nextConfig)
