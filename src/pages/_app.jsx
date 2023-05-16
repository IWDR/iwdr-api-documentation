import Head from 'next/head'
import {Router, useRouter} from 'next/router'
import {MDXProvider} from '@mdx-js/react'

import {Layout} from '@/components/Layout'
import * as mdxComponents from '@/components/mdx'
import {useMobileNavigationStore} from '@/components/MobileNavigation'

import '@/styles/tailwind.css'
import '@/styles/app.css'
import 'focus-visible'
import {SWRConfig} from 'swr'
import axios from '@/lib/axios'
import {useBannerStore} from "@/stores/bannerStore";
import Link from "next/link";
import {ArrowRightIcon} from "@heroicons/react/20/solid";

function onRouteChange() {
    useMobileNavigationStore.getState().close()
}

Router.events.on('hashChangeStart', onRouteChange)
Router.events.on('routeChangeComplete', onRouteChange)
Router.events.on('routeChangeError', onRouteChange)

export default function App({Component, pageProps: {...pageProps}}) {
    const showBanner = useBannerStore((state) => state.showBanner);
    const router = useRouter();

    return (
        <>
            <Head>
                {
                    <title>{`${
                        pageProps.title ? pageProps.title + ' - ' : ''
                    } IWDR API Reference`}</title>
                }
                <meta name="description" content={pageProps.description}/>
            </Head>
            <MDXProvider components={mdxComponents}>
                <SWRConfig
                    value={{
                        errorRetryCount: 2,
                        fallbackData: [],
                        onError: (error) => {
                            if (error.response?.status === 401) {
                                showBanner(
                                    <>
                                        Your session has expired.
                                        <Link
                                            href={`/login?redirect=${encodeURIComponent(router.asPath)}`}
                                            className="ml-1 inline-flex items-center justify-center gap-0.5 overflow-hidden font-medium underline underline-offset-4"
                                        >
                                            Please sign in again
                                            <ArrowRightIcon className="h-4 w-4 mt-1"/>
                                        </Link>
                                    </>
                                    , 'warning', true)
                            }
                        },
                        fetcher: ({resource, options}) =>
                            axios.get(resource, options ?? null).then((res) => res.data),
                    }}
                >
                    <Layout {...pageProps}>
                        <Component {...pageProps} />
                    </Layout>
                </SWRConfig>
            </MDXProvider>
        </>
    )
}
