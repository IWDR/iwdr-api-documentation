import LoginForm from '@/components/forms/LoginForm'

export async function getServerSideProps() {
  return {
    props: {
      title: 'Sign In',
    },
  }
}

export default function Login({ title }) {
  return (
    <>
      <h1>{title}</h1>
      <p>Access user restricted pages and content.</p>
      <LoginForm />
    </>
  )
}
