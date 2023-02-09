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
import { authStore, AuthProvider } from '@/lib/stores/authStore'
import { SWRConfig } from 'swr'

function onRouteChange() {
  useMobileNavigationStore.getState().close()
}

Router.events.on('hashChangeStart', onRouteChange)
Router.events.on('routeChangeComplete', onRouteChange)
Router.events.on('routeChangeError', onRouteChange)

export default function App({ Component, pageProps }) {
  let router = useRouter()
  const { setLoading } = useLoadingStore()
  const { showAlert } = useAlertStore()

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
      <AuthProvider value={authStore}>
        <MDXProvider components={mdxComponents}>
          <SWRConfig
            value={{
              refreshInterval: 120 * 1000,
              fetcher: ([resource, init]) => {
                setLoading(true)
                fetch(resource, init)
                  .then((res) => {
                    if (!res.ok && res.status !== 422) {
                      showAlert(
                        'There was an issue proccessing your request. Please try again later.',
                        'error',
                        true,
                        6000
                      )
                    }

                    if (res.status !== 204) return res.json()

                    return res.body
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
      </AuthProvider>
    </>
  )
}
