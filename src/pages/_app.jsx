import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'

import { Layout } from '@/components/Layout'
import * as mdxComponents from '@/components/mdx'
import { useMobileNavigationStore } from '@/components/MobileNavigation'

import '@/styles/tailwind.css'
import '@/styles/app.css'
import 'focus-visible'
import { useLoadingStore } from '@/lib/stores/loadingStore'
import { useAlertStore } from '@/lib/stores/alertStore'
import { SWRConfig } from 'swr'
import axios from '@/lib/axios'
import { useAuth } from '@/hooks/auth'

function onRouteChange() {
  useMobileNavigationStore.getState().close()
}

Router.events.on('hashChangeStart', onRouteChange)
Router.events.on('routeChangeComplete', onRouteChange)
Router.events.on('routeChangeError', onRouteChange)

export default function App({ Component, pageProps }) {
  let router = useRouter()
  const { setLoading } = useLoadingStore()
  const { serverErrorAlert } = useAlertStore()
  const { logout } = useAuth()

  return (
    <>
      <Head>
        {router.pathname === '/' ? (
          <title>IWDR API Reference</title>
        ) : (
          <title>{`${pageProps.title} - IWDR API Reference`}</title>
        )}
        <meta name="description" content={pageProps.description} />
      </Head>
      <MDXProvider components={mdxComponents}>
        <SWRConfig
          value={{
            errorRetryCount: 2,
            fallbackData: null,
            onError: () => {},
            fetcher: ({ resource, options, method = 'get' }) => {
              setLoading(true)
              axios[method](resource, options ?? null)
                .then((res) => {
                  if (res.status !== 200 || res.status !== 204) {
                    serverErrorAlert()
                    return null
                  }

                  return res.data
                })
                .catch((error) => {
                  // All requests should be authenticated
                  if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                  ) {
                    logout()
                  }
                  serverErrorAlert()
                })
                .finally(() => setLoading(false))
            },
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
