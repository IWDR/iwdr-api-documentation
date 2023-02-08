import LoginForm from '@/components/forms/LoginForm'

export function getServerSideProps() {
  return {
    props: {
      title: 'Sign In',
    },
  }
}

export default function Login() {
  return (
    <>
      <h1>Sign In</h1>
      <p>Access user restricted pages and content.</p>
      <LoginForm />
    </>
  )
}
