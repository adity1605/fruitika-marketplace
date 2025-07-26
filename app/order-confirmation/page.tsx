"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, Truck, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
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

  return (
    <div className="min-h-screen bg-[#f9f4e7]">
      <header className="bg-[#f9f4e7]/80 backdrop-blur-[2px] border-b border-[#8FBC8F]/20">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center">
            <Image src="/images/ChatGPT_Image_Jul_24__2025__04_18_40_PM-removebg-preview.png" alt="Fruitika" width={300} height={90} className="h-24 w-auto" />
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-[#2F5233] mb-2">Order Confirmed!</h1>
            <p className="text-[#5A6B5D]">Thank you for your purchase. Your order has been successfully placed.</p>
          </div>

          {order && (
            <Card className="border-[#8FBC8F]/20 bg-[#fefcf5] mb-6">
              <CardHeader>
                <CardTitle className="text-[#2F5233] flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#5A6B5D]">Order ID</p>
                    <p className="font-semibold text-[#2F5233]">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#5A6B5D]">Order Date</p>
                    <p className="font-semibold text-[#2F5233]">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#5A6B5D]">Status</p>
                    <p className="font-semibold text-green-600 capitalize">{order.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#5A6B5D]">Total Amount</p>
                    <p className="font-semibold text-[#2F5233]">${order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="border-t border-[#8FBC8F]/20 pt-4">
                  <h3 className="font-semibold text-[#2F5233] mb-3">Items Ordered</h3>
                  <div className="space-y-3">
                    {order.items?.map((item: any) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <Image src={item.product.image} alt={item.product.name} width={50} height={50} className="rounded" />
                        <div className="flex-grow">
                          <p className="font-medium text-[#2F5233]">{item.product.name}</p>
                          <p className="text-sm text-[#5A6B5D]">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-[#2F5233]">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-[#8FBC8F]/20 bg-[#fefcf5] mb-6">
            <CardHeader>
              <CardTitle className="text-[#2F5233] flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                What's Next?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#2F5233] rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-[#2F5233]">Order Processing</p>
                  <p className="text-sm text-[#5A6B5D]">We're preparing your fresh fruits for shipment</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#8FBC8F] rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-[#2F5233]">Shipping</p>
                  <p className="text-sm text-[#5A6B5D]">Your order will be shipped within 1-2 business days</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#8FBC8F] rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-[#2F5233]">Delivery</p>
                  <p className="text-sm text-[#5A6B5D]">Estimated delivery: 3-5 business days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#2F5233] hover:bg-[#8FBC8F]">
              <Link href="/dashboard">
                <Package className="w-4 h-4 mr-2" />
                View Orders
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-[#8FBC8F] text-[#2F5233]">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}