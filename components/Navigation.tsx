"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, User, LogOut, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/AuthContext"
import { motion, AnimatePresence } from "framer-motion"

export default function Navigation() {
  const { user, logout, isAuthenticated } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="bg-[#f9f4e7]/95 backdrop-blur-sm border-b border-[#8FBC8F]/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/ChatGPT_Image_Jul_24__2025__04_18_40_PM-removebg-preview.png" 
              alt="Fruitika" 
              width={200} 
              height={60} 
              className="h-16 w-auto sm:h-20" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#2F5233] hover:text-[#8FBC8F] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="text-[#2F5233]">
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#8FBC8F] text-[#2F5233] hover:bg-[#8FBC8F] hover:text-white"
                  asChild
                >
                  <Link href="/dashboard">
                    <User className="w-4 h-4 mr-2" />
                    {user?.name?.split(' ')[0] || 'Profile'}
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  className="bg-[#2F5233] hover:bg-[#8FBC8F] text-white"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#8FBC8F] text-[#2F5233] hover:bg-[#8FBC8F] hover:text-white"
                  asChild
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button 
                  size="sm" 
                  className="bg-[#2F5233] hover:bg-[#8FBC8F] text-white" 
                  asChild
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-[#2F5233]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-[#8FBC8F]/20"
            >
              <nav className="flex flex-col space-y-4 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[#2F5233] hover:text-[#8FBC8F] transition-colors font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="flex flex-col space-y-3 pt-4 border-t border-[#8FBC8F]/20">
                  <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start border-[#8FBC8F] text-[#2F5233]">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Cart
                    </Button>
                  </Link>
                  
                  {isAuthenticated ? (
                    <>
                      <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full justify-start border-[#8FBC8F] text-[#2F5233]"
                        >
                          <User className="w-4 h-4 mr-2" />
                          {user?.name || 'Dashboard'}
                        </Button>
                      </Link>
                      <Button 
                        className="w-full bg-[#2F5233] hover:bg-[#8FBC8F] text-white"
                        onClick={() => {
                          logout()
                          setMobileMenuOpen(false)
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full border-[#8FBC8F] text-[#2F5233]"
                        >
                          Login
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full bg-[#2F5233] hover:bg-[#8FBC8F] text-white">
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
