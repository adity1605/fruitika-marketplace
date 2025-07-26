"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"

interface User {
  id: string
  name: string
  email: string
  role?: string
}

interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isAuthenticated: boolean
  refreshAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "loading") {
      setLoading(true)
      return
    }
    
    if (session?.user) {
      setUser({
        id: session.user.id || '',
        name: session.user.name || '',
        email: session.user.email || '',
        role: session.user.role || 'user'
      })
      setLoading(false)
    } else {
      checkJWTAuth()
    }
  }, [session, status])

  const checkJWTAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = (userData: User) => {
    setUser(userData)
  }

  const refreshAuth = async () => {
    await checkJWTAuth()
  }

  const logout = async () => {
    try {
      if (session) {
        await signOut({ redirect: false })
      }
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
    }
  }

  const isAuthenticated = !!user

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f4e7] flex items-center justify-center">
        <div className="text-2xl text-[#2F5233]">Loading...</div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}