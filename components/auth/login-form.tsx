"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-[#f9f4e7] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card className="border-[#8FBC8F]/20 shadow-lg bg-[#fefcf5]">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <Image src="/images/fruitika-logo.png" alt="Fruitika" width={220} height={70} className="h-18 w-auto" />
            </div>
            <CardTitle className="text-2xl text-[#2F5233]">Welcome Back</CardTitle>
            <p className="text-[#5A6B5D]">Sign in to your account</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#2F5233]">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5A6B5D] w-4 h-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 border-[#8FBC8F]/30 focus:border-[#2F5233]"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#2F5233]">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5A6B5D] w-4 h-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-10 border-[#8FBC8F]/30 focus:border-[#2F5233]"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5A6B5D] hover:text-[#2F5233]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded border-[#8FBC8F]/30" />
                  <span className="text-[#5A6B5D]">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-[#2F5233] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-[#2F5233] hover:bg-[#8FBC8F] text-white" size="lg">
                Sign In
              </Button>
            </form>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-2 text-[#5A6B5D] text-sm">or</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-[#5A6B5D]">
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#2F5233] hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
