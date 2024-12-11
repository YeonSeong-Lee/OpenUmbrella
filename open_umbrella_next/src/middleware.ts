import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware() {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/auth'
    }
  }
)

export const config = {
  matcher: [
    '/mypage/:path*',
    '/share/:path*'
  ]
} 