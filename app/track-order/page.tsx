"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react"

interface TrackingLog {
  id: string
  status: string
  location?: string
  description: string
  timestamp: string
}

interface Order {
  id: string
  status: string
  trackingId: string
  total: number
  createdAt: string
  shippingDate?: string
  deliveryDate?: string
  user: {
    name: string
    email: string
  }
  items: {
    quantity: number
    price: number
    product: {
      name: string
    }
  }[]
  trackingLogs: TrackingLog[]
}

export default function TrackOrderPage() {
  const [trackingId, setTrackingId] = useState("")
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleTrackOrder = async () => {
    if (!trackingId.trim()) {
      setError("Please enter a tracking ID")
      return
    }

    setLoading(true)
    setError("")
    
    try {
      const response = await fetch(`/api/track-order?trackingId=${trackingId}`)
      const data = await response.json()
      
      if (response.ok) {
        setOrder(data.order)
      } else {
        setError(data.error || "Order not found")
        setOrder(null)
      }
    } catch (error) {
      setError("Failed to track order")
      setOrder(null)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f4e7] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#2F5233] mb-4">Track Your Order</h1>
          <p className="text-[#5A6B5D]">Enter your tracking ID to see the current status of your order</p>
        </div>

        <Card className="border-[#8FBC8F]/20 bg-[#fefcf5] mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Input
                placeholder="Enter tracking ID (e.g., TRK123456)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
              />
              <Button 
                onClick={handleTrackOrder}
                disabled={loading}
                className="bg-[#2F5233] hover:bg-[#8FBC8F]"
              >
                {loading ? "Tracking..." : "Track Order"}
              </Button>
            </div>
            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
          </CardContent>
        </Card>

        {order && (
          <div className="space-y-6">
            <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
              <CardHeader>
                <CardTitle className="text-[#2F5233] flex items-center justify-between">
                  <span>Order #{order.id.slice(-8)}</span>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#5A6B5D]">Customer: {order.user.name}</p>
                    <p className="text-sm text-[#5A6B5D]">Email: {order.user.email}</p>
                    <p className="text-sm text-[#5A6B5D]">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#5A6B5D]">Tracking ID: {order.trackingId}</p>
                    <p className="text-sm text-[#5A6B5D]">Total: ${order.total.toFixed(2)}</p>
                    {order.shippingDate && (
                      <p className="text-sm text-[#5A6B5D]">Shipped: {new Date(order.shippingDate).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
              <CardHeader>
                <CardTitle className="text-[#2F5233]">Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-[#8FBC8F]/20 last:border-b-0">
                      <div>
                        <p className="font-medium text-[#2F5233]">{item.product.name}</p>
                        <p className="text-sm text-[#5A6B5D]">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-[#2F5233]">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
              <CardHeader>
                <CardTitle className="text-[#2F5233]">Tracking History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.trackingLogs.length > 0 ? (
                    order.trackingLogs.map((log, index) => (
                      <div key={log.id} className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(log.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={getStatusColor(log.status)} variant="outline">
                              {log.status.toUpperCase()}
                            </Badge>
                            <span className="text-sm text-[#5A6B5D]">
                              {new Date(log.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-[#2F5233] font-medium">{log.description}</p>
                          {log.location && (
                            <p className="text-sm text-[#5A6B5D] flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" />
                              {log.location}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#5A6B5D] text-center py-4">No tracking updates available yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}