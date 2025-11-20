import Head from 'next/head';
import { Router } from 'next/router';
import { MDXProvider } from '@mdx-js/react';
import * as mdxComponents from '@/components/mdx';
import { useMobileNavigationStore } from '@/components/MobileNavigation';
import '@/styles/tailwind.css';
import '@/styles/app.css';
import 'focus-visible';
import { SWRConfig } from 'swr';
import axios from '@/lib/axios';
import { Layout } from '@/components/Layout';
import { SessionProvider } from 'next-auth/react';

function onRouteChange() {
    useMobileNavigationStore.getState().close();
}

Router.events.on('hashChangeStart', onRouteChange);
Router.events.on('routeChangeComplete', onRouteChange);
Router.events.on('routeChangeError', onRouteChange);

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <>
            <Head>
                {<title>{`${pageProps.title ? pageProps.title + ' - ' : ''} IWDR API Reference`}</title>}
                <meta name="description" content={pageProps.description} />
            </Head>
            <SessionProvider session={session}>
                <MDXProvider components={mdxComponents}>
                    <SWRConfig
                        value={{
                            errorRetryCount: 2,
                            fallbackData: [],
                            fetcher: ({ resource, options }) =>
                                axios.get(resource, options ?? null).then((res) => res.data),
                        }}
                    >
                        <Layout {...pageProps}>
                            <Component {...pageProps} />
                        </Layout>
                    </SWRConfig>
                </MDXProvider>
            </SessionProvider>
        </>
    );
}
