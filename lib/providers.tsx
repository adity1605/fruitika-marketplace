"use client"

import { SessionProvider } from 'next-auth/react'
import { CartProvider } from '@/lib/CartContext'
import { AuthProvider } from '@/lib/AuthContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </SessionProvider>
  )
}