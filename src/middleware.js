import { NextResponse } from 'next/server'
import cookie from 'cookie'

export async function middleware(request) {
  const cookies = cookie.parse(request.headers.get('cookie'))
  const redirectRes = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_APP_URL}/login?redirect=` +
      encodeURIComponent(request.nextUrl.pathname)
  )

  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-info`, {
    method: 'GET',
    headers: {
      Cookie: request.headers.get('cookie'),
      'X-XSRF-TOKEN': cookies['XSRF-TOKEN'] ?? null,
    },
    credentials: 'include',
  })
    .then((res) => {
      if (!res.ok) {
        return redirectRes
      }

      const response = NextResponse.next()
      response.headers.set('set-cookie', res.headers.get('set-cookie'))

      return response
    })
    .catch((err) => {
      console.log(err)
      return redirectRes
    })
}
export const config = {
  matcher: ['/resources/:path*'],
}
