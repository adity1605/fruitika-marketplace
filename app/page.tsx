"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Leaf, Globe, Award, User, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/lib/AuthContext"
import Image from "next/image"

export default function HomePage() {
  const { user, logout, isAuthenticated } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-[#2F5233]" />,
      title: "100% Organic",
      description: "Fresh, naturally grown fruits without harmful chemicals",
    },
    {
      icon: <Globe className="w-8 h-8 text-[#2F5233]" />,
      title: "Global Export",
      description: "Delivering premium fruits worldwide with care",
    },
    {
      icon: <Award className="w-8 h-8 text-[#2F5233]" />,
      title: "Premium Quality",
      description: "Hand-picked fruits meeting international standards",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f9f4e7]">
      {/* Header */}
      <header className="bg-[#f9f4e7]/95 backdrop-blur-sm border-b border-[#8FBC8F]/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center">
            <Image src="/images/ChatGPT_Image_Jul_24__2025__04_18_40_PM-removebg-preview.png" alt="Fruitika" width={300} height={90} className="h-24 w-auto" />
          </motion.div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-[#2F5233] hover:text-[#2F5233] transition-colors font-medium">
              Home
            </Link>
            <Link href="/products" className="text-[#2F5233] hover:text-[#2F5233] transition-colors font-medium">
              Products
            </Link>
            <Link href="/about" className="text-[#2F5233] hover:text-[#2F5233] transition-colors font-medium">
              About
            </Link>
            <Link href="/careers" className="text-[#2F5233] hover:text-[#2F5233] transition-colors font-medium">
              Careers
            </Link>
            <Link href="/contact" className="text-[#2F5233] hover:text-[#2F5233] transition-colors font-medium">
              Contact
            </Link>
          </nav>
          <div className="hidden md:flex space-x-4">
            {isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  size="default"
                  className="border-[#8FBC8F] text-[#2F5233] hover:bg-[#8FBC8F] hover:text-white bg-[#fefcf5] px-6"
                  asChild
                >
                  <Link href="/dashboard">
                    <User className="w-4 h-4 mr-2" />
                    {user?.name || 'Dashboard'}
                  </Link>
                </Button>
                <Button 
                  size="default" 
                  className="bg-[#2F5233] hover:bg-[#8FBC8F] text-white px-6"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="default"
                  className="border-[#8FBC8F] text-[#2F5233] hover:bg-[#8FBC8F] hover:text-white bg-[#fefcf5] px-6"
                  asChild
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="default" className="bg-[#2F5233] hover:bg-[#8FBC8F] text-white px-6" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#fefcf5] border-t border-[#8FBC8F]/20">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link href="/" className="block text-[#2F5233] hover:text-[#8FBC8F] transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/products" className="block text-[#2F5233] hover:text-[#8FBC8F] transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                Products
              </Link>
              <Link href="/about" className="block text-[#2F5233] hover:text-[#8FBC8F] transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/careers" className="block text-[#2F5233] hover:text-[#8FBC8F] transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                Careers
              </Link>
              <Link href="/contact" className="block text-[#2F5233] hover:text-[#8FBC8F] transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <div className="pt-4 space-y-2">
                {isAuthenticated ? (
                  <>
                    {user?.role === 'admin' && (
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white" asChild>
                        <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>Admin Panel</Link>
                      </Button>
                    )}
                    <Button className="w-full bg-[#2F5233] hover:bg-[#8FBC8F] text-white" asChild>
                      <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                        <User className="w-4 h-4 mr-2" />
                        {user?.name || 'Dashboard'}
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-[#8FBC8F] text-[#2F5233]"
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="w-full bg-[#2F5233] hover:bg-[#8FBC8F] text-white" asChild>
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                    </Button>
                    <Button variant="outline" className="w-full border-[#8FBC8F] text-[#2F5233]" asChild>
                      <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-[#2F5233] leading-tight">
              Fresh Fruits
              <span className="text-[#2F5233]"> Delivered</span>
              <br />
              Worldwide
            </h1>
            <p className="text-xl text-[#5A6B5D] leading-relaxed">
              Premium quality organic fruits exported globally. From our orchards to your table, experience the taste of
              nature's finest produce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#2F5233] hover:bg-[#8FBC8F] text-white px-6 sm:px-8 py-3 text-base sm:text-lg" asChild>
                <Link href="/products">
                  Shop Now <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#8FBC8F] text-[#2F5233] hover:bg-[#8FBC8F] hover:text-white px-6 sm:px-8 py-3 text-base sm:text-lg bg-[#fefcf5]"
                asChild
              >
                <Link href="/contact">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#fefcf5] to-[#f5f1e4] p-8 shadow-lg">
              <Image
                src="/images/hero-oranges.avif"
                alt="Fresh Fruitika Oranges"
                width={600}
                height={400}
                className="w-full h-auto rounded-xl shadow-md"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2F5233]/5 to-transparent rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#fefcf5]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#2F5233] mb-4">Why Choose Fruitika?</h2>
            <p className="text-xl text-[#5A6B5D] max-w-2xl mx-auto">
              We're committed to delivering the finest quality fruits with sustainable practices
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="border-[#8FBC8F]/20 hover:shadow-lg transition-shadow duration-300 h-full bg-[#f9f4e7]/50">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="flex justify-center">{feature.icon}</div>
                    <h3 className="text-2xl font-semibold text-[#2F5233]">{feature.title}</h3>
                    <p className="text-[#5A6B5D] leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#8FBC8F] to-[#2F5233]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Taste the Difference?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of satisfied customers worldwide who trust Fruitika for premium quality fruits
            </p>
            <Button
              size="lg"
              className="bg-[#f9f4e7] text-[#2F5233] hover:bg-[#fefcf5] px-8 py-3 text-lg font-semibold"
              asChild
            >
              <Link href="/products">
                Explore Products <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2F5233] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Image src="/images/ChatGPT Image Jul 24, 2025, 04_18_40 PM.png" alt="Fruitika" width={240} height={75} className="h-18 w-auto" />
              </div>
              <p className="text-gray-300">Premium organic fruits delivered worldwide with love and care.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/products" className="block text-gray-300 hover:text-[#8FBC8F] transition-colors">
                  Products
                </Link>
                <Link href="/about" className="block text-gray-300 hover:text-[#8FBC8F] transition-colors">
                  About Us
                </Link>
                <Link href="/contact" className="block text-gray-300 hover:text-[#8FBC8F] transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <div className="space-y-2">
                <Link
                  href="/products?category=citrus"
                  className="block text-gray-300 hover:text-[#8FBC8F] transition-colors"
                >
                  Citrus Fruits
                </Link>
                <Link
                  href="/products?category=tropical"
                  className="block text-gray-300 hover:text-[#8FBC8F] transition-colors"
                >
                  Tropical Fruits
                </Link>
                <Link
                  href="/products?category=seasonal"
                  className="block text-gray-300 hover:text-[#8FBC8F] transition-colors"
                >
                  Seasonal Fruits
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <p>📧 info@fruitika.com</p>
                <p>📞 +1 (555) 123-4567</p>
                <p>📍 Fresh Valley, CA 90210</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Fruitika. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
