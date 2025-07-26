"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Package, Truck, Calendar, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export default function OrderDetailsPage() {
  const params = useParams()
  const orderId = params.id as string
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId)
    }
  }, [orderId])

  const fetchOrder = async (id: string) => {
    try {
      const response = await fetch(`/api/orders/${id}`)
      if (response.ok) {
        const data = await response.json()
        setOrder(data.order)
      }
    } catch (error) {
      console.error('Failed to fetch order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f4e7] flex items-center justify-center">
        <div className="text-2xl text-[#2F5233]">Loading order details...</div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f9f4e7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2F5233] mb-4">Order not found</h1>
          <Button asChild className="bg-[#2F5233] hover:bg-[#8FBC8F]">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f4e7]">
      <header className="bg-[#f9f4e7]/80 backdrop-blur-[2px] border-b border-[#8FBC8F]/20">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="flex items-center text-[#2F5233] hover:text-[#8FBC8F]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#2F5233] mb-2">{order.items?.[0]?.product?.name || 'Order Details'}</h1>
              <p className="text-[#5A6B5D]">Order #{order.id}</p>
            </div>
            <Badge className={`mt-2 sm:mt-0 w-fit ${
              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
                <CardHeader>
                  <CardTitle className="text-[#2F5233] flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Items Ordered
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items?.map((item: any) => (
                      <div key={item.id} className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 border border-[#8FBC8F]/20 rounded-lg">
                        <Image 
                          src={item.product.image} 
                          alt={item.product.name} 
                          width={80} 
                          height={80} 
                          className="rounded-lg mx-auto sm:mx-0" 
                        />
                        <div className="flex-grow text-center sm:text-left">
                          <h3 className="font-semibold text-[#2F5233]">{item.product.name}</h3>
                          <p className="text-sm text-[#5A6B5D] mt-1">{item.product.description}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2">
                            <span className="text-sm text-[#5A6B5D]">Quantity: {item.quantity}</span>
                            <span className="font-semibold text-[#2F5233]">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
                <CardHeader>
                  <CardTitle className="text-[#2F5233] flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    Order Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-[#2F5233] rounded-full mt-1"></div>
                      <div>
                        <p className="font-medium text-[#2F5233]">Order Confirmed</p>
                        <p className="text-sm text-[#5A6B5D]">{new Date(order.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-[#8FBC8F] rounded-full mt-1"></div>
                      <div>
                        <p className="font-medium text-[#2F5233]">Processing</p>
                        <p className="text-sm text-[#5A6B5D]">Your order is being prepared</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-gray-300 rounded-full mt-1"></div>
                      <div>
                        <p className="font-medium text-gray-500">Shipped</p>
                        <p className="text-sm text-gray-400">Estimated 1-2 business days</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
                <CardHeader>
                  <CardTitle className="text-[#2F5233] flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5A6B5D]">Order Date</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5A6B5D]">Order ID</span>
                    <span className="font-mono text-xs">{order.id}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5A6B5D]">Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5A6B5D]">Shipping</span>
                    <span>${order.shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-[#2F5233]">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
                <CardHeader>
                  <CardTitle className="text-[#2F5233] flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-[#5A6B5D]">
                    Have questions about your order? We're here to help!
                  </p>
                  <Button variant="outline" className="w-full border-[#8FBC8F] text-[#2F5233]" asChild>
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}