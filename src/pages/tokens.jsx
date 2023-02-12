import Spinner from '@/components/Spinner'
import TokensDataTable from '@/components/tokens/TokensDataTable'
import useSWR from 'swr'
import { useAuth } from '@/hooks/auth'

export function getServerSideProps() {
  return {
    props: {
      title: 'Tokens',
    },
  }
}

export default function Tokens() {
  const { user } = useAuth({ middleware: 'auth' })

  const {
    data: tokens,
    error,
    mutate,
    isLoading,
  } = useSWR({ resource: '/tokens' })

  if (isLoading) {
    return (
      <div className='my-4'>
        <Spinner />
      </div>
    )
  }

  if (error) {
    return <p>There was an issue loading this page. Please contact support.</p>
  }

  return (
    <>
      <h1>Tokens</h1>
      <TokensDataTable tokens={tokens} mutator={mutate} user={user} />
    </>
  )
}
