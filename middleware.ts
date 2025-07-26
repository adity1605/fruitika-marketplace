import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Security headers
  const response = NextResponse.next()
  
  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY')
  
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  // XSS Protection
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Referrer Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://checkout.razorpay.com https://cdn.emailjs.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.emailjs.com https://api.razorpay.com https://lumberjack.razorpay.com https://checkout.razorpay.com; frame-src 'self' https://api.razorpay.com https://checkout.razorpay.com;"
  )
  
  // HTTPS redirect in production
  if (process.env.NODE_ENV === 'production' && !request.url.startsWith('https://')) {
    return NextResponse.redirect(`https://${request.headers.get('host')}${request.nextUrl.pathname}`)
  }
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}