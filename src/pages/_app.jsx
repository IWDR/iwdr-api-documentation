import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'

import { Layout } from '@/components/Layout'
import * as mdxComponents from '@/components/mdx'
import { useMobileNavigationStore } from '@/components/MobileNavigation'

import '@/styles/tailwind.css'
import '@/styles/app.css'
import 'focus-visible'
import { SWRConfig } from 'swr'
import axios from '@/lib/axios'

function onRouteChange() {
  useMobileNavigationStore.getState().close()
}

Router.events.on('hashChangeStart', onRouteChange)
Router.events.on('routeChangeComplete', onRouteChange)
Router.events.on('routeChangeError', onRouteChange)

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {
          <title>{`${
            pageProps.title ? pageProps.title + ' - ' : ''
          } IWDR API Reference`}</title>
        }
        <meta name="description" content={pageProps.description} />
      </Head>
      <MDXProvider components={mdxComponents}>
        <SWRConfig
          value={{
            errorRetryCount: 2,
            fallbackData: [],
            onError: () => {},
            fetcher: ({ resource, options, method = 'get' }) =>
              axios[method](resource, options ?? null).then((res) => res.data),
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
