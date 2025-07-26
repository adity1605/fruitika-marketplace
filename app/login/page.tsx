"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/AuthContext"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login, refreshAuth } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    try {
      // Try NextAuth credentials first
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        // If NextAuth fails, try custom auth
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        
        if (!response.ok) {
          // If regular auth fails, try test login
          const testResponse = await fetch('/api/auth/test-login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
          
          const testData = await testResponse.json()
          
          if (testResponse.ok && testData.success) {
            await login(testData.user)
            await refreshAuth()
            router.push('/')
            return
          } else {
            setError(testData.error || 'Login failed')
            return
          }
        }
        
        const data = await response.json()
        
        if (response.ok && data.success) {
          await login(data.user)
          await refreshAuth()
          router.push('/')
        } else {
          setError(data.error || 'Login failed')
        }
      } else if (result?.ok) {
        router.push('/')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      console.log('Starting Google sign in...')
      setIsLoading(true)
      setError("") // Clear any existing errors
      
      // Use NextAuth signIn with more specific options
      const result = await signIn('google', { 
        callbackUrl: '/',
        redirect: true
      })
      
      console.log('Google sign in result:', result)
    } catch (error) {
      console.error('Google sign in error:', error)
      setError('Google sign in failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="h-screen bg-[#f9f4e7] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-4">
          <Link href="/" className="flex justify-center">
            <Image src="/images/ChatGPT_Image_Jul_24__2025__04_18_40_PM-removebg-preview.png" alt="Fruitika" width={400} height={120} className="h-32 w-auto mb-2" />
          </Link>
          <h1 className="text-xl font-bold text-[#2F5233]">Welcome Back</h1>
          <p className="text-sm text-[#5A6B5D]">Sign in to your account</p>
        </div>

        <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
          <CardContent className="p-4 space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
                {error}
              </div>
            )}
            
            {/* Email/Password Login Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-[#2F5233]">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-[#8FBC8F]/30 focus:border-[#2F5233]"
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-[#2F5233]">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="border-[#8FBC8F]/30 focus:border-[#2F5233]"
                  placeholder="Enter your password"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#2F5233] hover:bg-[#8FBC8F] text-white"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#fefcf5] px-2 text-[#5A6B5D]">Or continue with</span>
              </div>
            </div>
            
            {/* Google OAuth */}
            <Button 
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full border-[#8FBC8F]/30 hover:bg-[#8FBC8F]/10"
              disabled={isLoading}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
            
            <div className="text-center text-sm text-[#5A6B5D]">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#2F5233] hover:underline font-medium">
                Sign up
              </Link>
            </div>
            
            <div className="text-center text-xs text-[#5A6B5D] border-t pt-3">
              <p className="font-medium mb-1">Test Credentials:</p>
              <p>Email: test@fruitika.com</p>
              <p>Password: password123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}