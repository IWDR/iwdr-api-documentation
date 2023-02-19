import Spinner from '@/components/Spinner'
import TokensDataTable from '@/components/tokens/TokensDataTable'
import useSWR from 'swr'

export function getServerSideProps() {
  return {
    props: {
      title: 'Tokens',
      description:
        'A list of currently active tokens in use by your organization.',
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
    return (
      <div className="not-prose">
        <div className="mb-24">
          <Spinner />
        </div>
      </div>
    )
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
