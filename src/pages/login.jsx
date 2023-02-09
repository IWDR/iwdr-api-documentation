import LoginForm from '@/components/forms/LoginForm'
import cookie from 'cookie'

export async function getServerSideProps({ res }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`,
    {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    }
  )

  if (response.status !== 204) return props

  res.setHeader('Set-Cookie', response.headers.raw()['set-cookie'])
  return {
    props: {
      title: 'Sign In',
      csrf_cookie: cookie.parse(response.headers.get('Set-Cookie'))[
        'XSRF-TOKEN'
      ],
    },
  }
}

export default function Login({ title, csrf_cookie }) {
  return (
    <>
      <h1>{title}</h1>
      <p>Access user restricted pages and content.</p>
      <LoginForm csrf_token={csrf_cookie} />
    </>
  )
}
