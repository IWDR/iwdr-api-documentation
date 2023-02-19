import { NextResponse } from 'next/server'
import cookie from 'cookie'

export async function middleware(request) {
  const cookies = cookie.parse(request.headers.get('cookie'))

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-info`, {
      method: 'GET',
      headers: {
        Cookie: request.headers.get('cookie'),
        'X-XSRF-TOKEN': cookies['XSRF-TOKEN'] ?? null,
      },
      credentials: 'include',
    })

    if (!res.ok) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/login?redirect=` +
          encodeURIComponent(request.nextUrl.pathname)
      )
    }

    const nextResponse = NextResponse.next()
    nextResponse.headers.set('set-cookie', res.headers.get('set-cookie'))

    return nextResponse
  } catch (err) {
    console.log(err)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/login?redirect=` +
        encodeURIComponent(request.nextUrl.pathname)
    )
  }
}

export const config = {
  matcher: ['/resources/:path*'],
}