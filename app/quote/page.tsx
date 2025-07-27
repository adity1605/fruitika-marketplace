"use client"

"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calculator, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    product: "",
    quantity: "",
    deliveryLocation: "",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, product: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log('Submitting quote form:', formData)
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      console.log('Quote API response status:', response.status)
      const data = await response.json()
      console.log('Quote API response data:', data)
      
      if (response.ok && data.success) {
        setSubmitted(true)
      } else {
        console.error('Quote submission failed:', data)
        alert('❌ Failed to submit quote request: ' + (data.error || 'Please try again'))
      }
    } catch (error) {
      console.error('Quote submission error:', error)
      alert('❌ Network error. Please check your connection and try again.')
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f9f4e7] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-[#2F5233] mb-4">Quote Request Submitted!</h1>
          <p className="text-[#5A6B5D] mb-6">
            Thank you for your interest. Our team will review your request and get back to you within 24 hours with a customized quote.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full bg-[#2F5233] hover:bg-[#8FBC8F]">
              <Link href="/products">Browse Products</Link>
            </Button>
            <Button variant="outline" asChild className="w-full border-[#8FBC8F] text-[#2F5233]">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f4e7]">
      <header className="bg-[#f9f4e7]/80 backdrop-blur-[2px] border-b border-[#8FBC8F]/20">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center text-[#2F5233] hover:text-[#8FBC8F]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Calculator className="w-12 h-12 text-[#2F5233] mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-[#2F5233] mb-4">Get Custom Quote</h1>
            <p className="text-[#5A6B5D]">
              Need bulk quantities or wholesale pricing? Fill out the form below and we'll provide you with a customized quote for your business needs.
            </p>
          </div>

          <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
            <CardHeader>
              <CardTitle className="text-[#2F5233]">Quote Request Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-[#2F5233]">Full Name *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="border-[#8FBC8F]/30 focus:border-[#2F5233]" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[#2F5233]">Email *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="border-[#8FBC8F]/30 focus:border-[#2F5233]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company" className="text-[#2F5233]">Company Name</Label>
                    <Input id="company" name="company" value={formData.company} onChange={handleChange} className="border-[#8FBC8F]/30 focus:border-[#2F5233]" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-[#2F5233]">Phone Number</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="border-[#8FBC8F]/30 focus:border-[#2F5233]" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="product" className="text-[#2F5233]">Product Interest *</Label>
                  <Select onValueChange={handleSelectChange} required>
                    <SelectTrigger className="border-[#8FBC8F]/30 focus:border-[#2F5233]">
                      <SelectValue placeholder="Select a product category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="citrus">Citrus Fruits (Oranges, Limes, Lemons)</SelectItem>
                      <SelectItem value="tropical">Tropical Fruits (Mangoes, Pineapples, Dragon Fruit)</SelectItem>
                      <SelectItem value="seasonal">Seasonal Fruits (Apples, Berries)</SelectItem>
                      <SelectItem value="mixed">Mixed Fruit Packages</SelectItem>
                      <SelectItem value="custom">Custom Selection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity" className="text-[#2F5233]">Estimated Quantity *</Label>
                    <Input id="quantity" name="quantity" placeholder="e.g., 500 kg, 1000 units" value={formData.quantity} onChange={handleChange} required className="border-[#8FBC8F]/30 focus:border-[#2F5233]" />
                  </div>
                  <div>
                    <Label htmlFor="deliveryLocation" className="text-[#2F5233]">Delivery Location *</Label>
                    <Input id="deliveryLocation" name="deliveryLocation" placeholder="City, Country" value={formData.deliveryLocation} onChange={handleChange} required className="border-[#8FBC8F]/30 focus:border-[#2F5233]" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-[#2F5233]">Additional Requirements</Label>
                  <Textarea id="message" name="message" placeholder="Please specify any special requirements, delivery timeline, packaging preferences, etc." value={formData.message} onChange={handleChange} rows={4} className="border-[#8FBC8F]/30 focus:border-[#2F5233]" />
                </div>

                <Button type="submit" className="w-full bg-[#2F5233] hover:bg-[#8FBC8F] text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Quote Request
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#5A6B5D] mb-4">
              Need immediate assistance? Contact our sales team directly:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:sales@fruitika.com" className="text-[#2F5233] hover:text-[#8FBC8F]">
                📧 sales@fruitika.com
              </a>
              <a href="tel:+15551234567" className="text-[#2F5233] hover:text-[#8FBC8F]">
                📞 +1 (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}