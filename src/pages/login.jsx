import LoginForm from '@/components/forms/LoginForm'

export async function getServerSideProps({ res }) {
  let initProps = { props: { title: 'Sign In' } }
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`,
    {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    }
  )

  if (response.status !== 204) {
    return initProps
  }

  // Ensure cookies are transferred 
  res.setHeader('Set-Cookie', response.headers.raw()['set-cookie'])
  return initProps
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
