import LoginForm from '@/components/forms/LoginForm'

export async function getServerSideProps({ query }) {
  return {
    props: {
      title: 'Sign In',
      redirect: query?.redirect ?? null,
    },
  }
}

export default function Login({ redirect }) {
  return (
    <>
      <h1>Sign In</h1>
      <p>Access user restricted pages and content.</p>
      <LoginForm redirect={redirect} />
    </>
  )
}
