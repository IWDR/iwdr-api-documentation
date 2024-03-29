import { useLoadingStore } from '@/stores/loadingStore';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import Spinner from './Spinner';

export default function LoadingOverlay() {
  const { setLoading } = useLoadingStore()
  const loading = useLoadingStore((state) => state.loading)
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true)
    const handleComplete = (url) => url === router.asPath && setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return (
    <Transition.Root
      show={loading}
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child>
          {/* Overlay */}
          <div className="fixed inset-0 flex h-full w-screen items-center justify-center overflow-y-auto bg-zinc-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Spinner className='block absolute inset-x-1/2 h-24 w-24 -mx-12'/>
            <span className="mt-40 text-xl font-medium text-white">
              Loading...
            </span>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
