"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <div className="min-h-screen bg-[#f9f4e7]">
      <header className="bg-[#f9f4e7]/80 backdrop-blur-[2px] border-b border-[#8FBC8F]/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/images/ChatGPT_Image_Jul_24__2025__04_18_40_PM-removebg-preview.png" alt="Fruitika" width={300} height={90} className="h-24 w-auto" />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-[#2F5233] hover:text-[#2F5233] transition-colors">Home</Link>
            <Link href="/products" className="text-[#2F5233] hover:text-[#2F5233] transition-colors">Products</Link>
            <Link href="/about" className="text-[#2F5233] font-semibold">About</Link>
            <Link href="/contact" className="text-[#2F5233] hover:text-[#2F5233] transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button 
              className="hidden sm:inline-flex bg-[#2F5233] hover:bg-[#8FBC8F] text-white"
              asChild
            >
              <Link href="/quote">Get Quote</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#fefcf5] border-t border-[#8FBC8F]/20">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link href="/" className="block text-[#2F5233] hover:text-[#8FBC8F] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/products" className="block text-[#2F5233] hover:text-[#8FBC8F] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Products
              </Link>
              <Link href="/about" className="block text-[#2F5233] font-semibold" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/contact" className="block text-[#2F5233] hover:text-[#8FBC8F] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <Button 
                className="w-full bg-[#2F5233] hover:bg-[#8FBC8F] text-white"
                asChild
              >
                <Link href="/quote" onClick={() => setMobileMenuOpen(false)}>Get Quote</Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#2F5233] mb-6">About Fruitika</h1>
          <p className="text-xl text-[#5A6B5D] max-w-3xl mx-auto">
            For over 15 years, Fruitika has been delivering premium organic fruits worldwide from our finest orchards.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-[#2F5233]">Our Story</h2>
            <p className="text-[#5A6B5D]">
              Founded in 2009, Fruitika began as a family business sharing exceptional locally grown fruits globally. Today, we work with 200+ certified organic farms across multiple continents.
            </p>
            <Button className="bg-[#2F5233] hover:bg-[#8FBC8F] text-white" asChild>
              <Link href="/contact">Partner With Us</Link>
            </Button>
          </div>
          <div>
            <div className="rounded-2xl bg-gradient-to-br from-[#fefcf5] to-[#f5f1e4] p-8 shadow-lg">
              <Image src="/images/hero-oranges.avif" alt="Fruitika Orchards" width={600} height={400} className="w-full h-auto rounded-xl" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#2F5233] mb-6">Ready to Experience Fruitika?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#2F5233] hover:bg-[#8FBC8F] text-white" asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-[#8FBC8F] text-[#2F5233] hover:bg-[#8FBC8F] hover:text-white" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}