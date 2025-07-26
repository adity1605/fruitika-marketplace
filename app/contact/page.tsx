"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, MessageCircle, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    inquiryType: "general",
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const result = await response.json()
      
      if (response.ok) {
        alert('✅ Message sent successfully! We will get back to you within 24 hours.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          inquiryType: 'general',
        })
      } else {
        alert('❌ Error: ' + (result.error || 'Failed to send message'))
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('❌ Network error. Please check your connection and try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-[#2F5233]" />,
      title: "Email Us",
      details: "info@fruitika.com",
      description: "Send us an email anytime",
    },
    {
      icon: <Phone className="w-6 h-6 text-[#2F5233]" />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri 9AM-6PM PST",
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#2F5233]" />,
      title: "Visit Us",
      details: "Fresh Valley, CA 90210",
      description: "Our main office location",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f9f4e7]">
      <header className="bg-transparent backdrop-blur-sm border-b border-[#8FBC8F]/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/images/ChatGPT_Image_Jul_24__2025__04_18_40_PM-removebg-preview.png" alt="Fruitika" width={300} height={90} className="h-24 w-auto" />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-[#2F5233] hover:text-[#2F5233] transition-colors">Home</Link>
            <Link href="/products" className="text-[#2F5233] hover:text-[#2F5233] transition-colors">Products</Link>
            <Link href="/about" className="text-[#2F5233] hover:text-[#2F5233] transition-colors">About</Link>
            <Link href="/contact" className="text-[#2F5233] font-semibold">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button className="hidden sm:inline-flex bg-[#2F5233] hover:bg-[#8FBC8F] text-white" asChild>
              <Link href="/quote">Get Quote</Link>
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#fefcf5] border-t border-[#8FBC8F]/20">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link href="/" className="block text-[#2F5233] hover:text-[#8FBC8F] transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/products" className="block text-[#2F5233] hover:text-[#8FBC8F] transition-colors" onClick={() => setMobileMenuOpen(false)}>Products</Link>
              <Link href="/about" className="block text-[#2F5233] hover:text-[#8FBC8F] transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/contact" className="block text-[#2F5233] font-semibold" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Button className="w-full bg-[#2F5233] hover:bg-[#8FBC8F] text-white" asChild>
                <Link href="/quote" onClick={() => setMobileMenuOpen(false)}>Get Quote</Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#2F5233] mb-4">Get in Touch</h1>
          <p className="text-xl text-[#5A6B5D] max-w-2xl mx-auto">
            Ready to start your fruit export journey? We're here to help you every step of the way.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#2F5233] mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{info.icon}</div>
                    <div>
                      <h3 className="font-semibold text-[#2F5233]">{info.title}</h3>
                      <p className="text-[#2F5233] font-medium">{info.details}</p>
                      <p className="text-[#5A6B5D] text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-[#8FBC8F]/20 bg-gradient-to-br from-[#8FBC8F]/10 to-[#2F5233]/10">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MessageCircle className="w-6 h-6 text-[#2F5233]" />
                  <h3 className="font-semibold text-[#2F5233]">Quick WhatsApp Inquiry</h3>
                </div>
                <p className="text-[#5A6B5D] mb-4">Get instant responses to your questions via WhatsApp</p>
                <Button className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white" onClick={() => window.open("https://wa.me/15551234567", "_blank")}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#2F5233]">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#2F5233]">Full Name *</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="border-[#8FBC8F]/30 focus:border-[#2F5233]" placeholder="Your full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#2F5233]">Email Address *</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="border-[#8FBC8F]/30 focus:border-[#2F5233]" placeholder="your@email.com" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#2F5233]">Phone Number</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="border-[#8FBC8F]/30 focus:border-[#2F5233]" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-[#2F5233]">Company Name</Label>
                      <Input id="company" name="company" value={formData.company} onChange={handleChange} className="border-[#8FBC8F]/30 focus:border-[#2F5233]" placeholder="Your company name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#2F5233]">Message *</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className="border-[#8FBC8F]/30 focus:border-[#2F5233]" placeholder="Tell us about your requirements, quantities, delivery location, and any specific questions you have..." />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-[#2F5233] hover:bg-[#8FBC8F] text-white">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}