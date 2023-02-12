import LoadingOverlay from '@/components/LoadingOverlay'
import Spinner from '@/components/Spinner'
import TokensDataTable from '@/components/tokens/TokensDataTable'
import useSWR from 'swr'

export function getServerSideProps() {
  return {
    props: {
      title: 'Tokens',
    },
  }
}

export default function Tokens() {
  const {
    data: tokens,
    error,
    mutate,
    isLoading,
  } = useSWR({ resource: '/tokens' })

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <p>There was an issue loading this page. Please contact support.</p>
  }

  return (
    <>
      <h1>Tokens</h1>
      <TokensDataTable tokens={tokens} mutator={mutate} />
    </>
  )
}
