import Link from 'next/link'
import { motion } from 'framer-motion'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { IWDRLogo } from '@/components/IWDRLogo'
import { Prose } from '@/components/Prose'
import { SectionProvider } from '@/components/SectionProvider'
import LoadingOverlay from './LoadingOverlay'
import { Alert } from './Alert'
import Navigation from './Navigation'
import { useAuth } from '@/hooks/auth'
import { AuthProvider } from '@/components/AuthProvider'

export function Layout({ children, sections = [] }) {
  const { user } = useAuth({ middleware: 'guest' })

  return (
    <SectionProvider sections={sections}>
      <AuthProvider user={user}>
        <LoadingOverlay />
        <Alert />
        <div className="lg:ml-72 xl:ml-80">
          <motion.header
            layoutScroll
            className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
          >
            <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pt-4 lg:pb-8 lg:dark:border-white/10 xl:w-80">
              <div className="hidden lg:flex">
                <Link href="/" aria-label="Home">
                  <IWDRLogo className="h-12" />
                </Link>
              </div>
              <Header />
              <Navigation className="hidden lg:mt-10 lg:block" />
            </div>
          </motion.header>
          <div className="relative px-4 pt-14 sm:px-6 lg:px-8">
            <main className="py-16">
              <Prose as="article">{children}</Prose>
            </main>
            <Footer />
          </div>
        </div>
      </AuthProvider>
    </SectionProvider>
  )
}
