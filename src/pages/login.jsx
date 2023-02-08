import LoginForm from '@/components/forms/LoginForm'

export async function getServerSideProps({ res }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`,
    {
      credentials: 'include',
    }
  )

  if (response.status !== 204) {
    // TODO: Create some kind of alert system
  }

  res.setHeader('Set-Cookie', response.headers.raw()['set-cookie']);

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
