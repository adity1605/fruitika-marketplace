"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/AuthContext"
import { ArrowLeft, CreditCard, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/CartContext"
import Image from "next/image"

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleRazorpayPayment = () => {
    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag', // Test key
      amount: Math.round(total * 100), // Amount in paise
      currency: 'INR',
      name: 'Fruitika',
      description: 'Fresh Fruits Order',
      image: '/images/ChatGPT_Image_Jul_24__2025__04_18_40_PM-removebg-preview.png',
      handler: async function (response: any) {
        try {
          setLoading(true)
          const orderData = {
            userId: user?.id,
            items: items.map(item => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price
            })),
            total,
            subtotal,
            shipping,
            paymentId: response.razorpay_payment_id,
            customerInfo: formData
          }
          
          const orderResponse = await fetch('/api/orders/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
          })
          
          if (orderResponse.ok) {
            const { orderId } = await orderResponse.json()
            clearCart()
            router.push(`/order-confirmation?orderId=${orderId}`)
          } else {
            const errorData = await orderResponse.json().catch(() => ({ error: 'Unknown error' }))
            console.error('Order creation failed:', errorData)
            alert(`Order creation failed: ${errorData.error || 'Please try again'}`)
          }
        } catch (error) {
          console.error('Order creation error:', error)
          alert(`Order creation failed: ${error instanceof Error ? error.message : 'Please try again'}`)
        } finally {
          setLoading(false)
        }
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone
      },
      theme: {
        color: '#2F5233'
      }
    }

    const rzp = new (window as any).Razorpay(options)
    rzp.open()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAuthenticated || !user) {
      alert('Please login to place an order')
      router.push('/login')
      return
    }
    
    if (items.length === 0) {
      alert('Your cart is empty')
      router.push('/products')
      return
    }
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('Please fill in all required fields')
      return
    }
    
    setLoading(true)
    handleRazorpayPayment()
  }

  const subtotal = getTotalPrice()
  const shipping = 15.99
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-[#f9f4e7]">
      <header className="bg-[#f9f4e7]/80 backdrop-blur-[2px] border-b border-[#8FBC8F]/20">
        <div className="container mx-auto px-4 py-4">
          <Link href="/cart" className="flex items-center text-[#2F5233] hover:text-[#8FBC8F]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#2F5233] mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
              <CardHeader>
                <CardTitle className="text-[#2F5233] flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-[#2F5233]">First Name</Label>
                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="border-[#8FBC8F]/30" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-[#2F5233]">Last Name</Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="border-[#8FBC8F]/30" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-[#2F5233]">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="border-[#8FBC8F]/30" />
                </div>
                <div>
                  <Label htmlFor="address" className="text-[#2F5233]">Address</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleChange} className="border-[#8FBC8F]/30" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-[#2F5233]">City</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleChange} className="border-[#8FBC8F]/30" />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-[#2F5233]">Postal Code</Label>
                    <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} className="border-[#8FBC8F]/30" />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-[#2F5233]">Country</Label>
                    <Input id="country" name="country" value={formData.country} onChange={handleChange} className="border-[#8FBC8F]/30" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
              <CardHeader>
                <CardTitle className="text-[#2F5233] flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber" className="text-[#2F5233]">Card Number</Label>
                  <Input id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={handleChange} className="border-[#8FBC8F]/30" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate" className="text-[#2F5233]">Expiry Date</Label>
                    <Input id="expiryDate" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleChange} className="border-[#8FBC8F]/30" />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-[#2F5233]">CVV</Label>
                    <Input id="cvv" name="cvv" placeholder="123" value={formData.cvv} onChange={handleChange} className="border-[#8FBC8F]/30" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="nameOnCard" className="text-[#2F5233]">Name on Card</Label>
                  <Input id="nameOnCard" name="nameOnCard" value={formData.nameOnCard} onChange={handleChange} className="border-[#8FBC8F]/30" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-[#8FBC8F]/20 bg-[#fefcf5] sticky top-8">
              <CardHeader>
                <CardTitle className="text-[#2F5233]">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <Image src={item.image} alt={item.name} width={50} height={50} className="rounded" />
                      <div className="flex-grow">
                        <p className="font-medium text-[#2F5233]">{item.name}</p>
                        <p className="text-sm text-[#5A6B5D]">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-[#2F5233]">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#5A6B5D]">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5A6B5D]">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5A6B5D]">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold text-[#2F5233]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button 
                  onClick={handleSubmit} 
                  disabled={loading || items.length === 0 || !isAuthenticated}
                  className="w-full bg-[#2F5233] hover:bg-[#8FBC8F] text-white disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 
                   !isAuthenticated ? 'Login Required' :
                   items.length === 0 ? 'Cart Empty' :
                   `Pay ₹${(total * 83).toFixed(0)} with Razorpay`}
                </Button>
                <p className="text-xs text-center text-[#5A6B5D] mt-2">
                  Test Mode: Use card 4111 1111 1111 1111, any CVV, future date
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}