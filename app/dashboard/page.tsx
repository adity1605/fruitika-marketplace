"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { User, Package, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/AuthContext"
import Image from "next/image"

interface Order {
  id: string
  createdAt: string
  status: string
  total: number
  items?: Array<{
    product?: {
      name: string
    }
  }>
}

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/orders?userId=${user.id}`)
      const data = await response.json()
      
      if (data.success) {
        setOrders(data.orders || [])
      } else {
        console.error('Failed to fetch orders:', data.error)
        setOrders([])
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f9f4e7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2F5233] mb-4">Please log in to access your dashboard</h1>
          <Button asChild className="bg-[#2F5233] hover:bg-[#8FBC8F]">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f4e7]">
      <header className="bg-[#f9f4e7]/80 backdrop-blur-[2px] border-b border-[#8FBC8F]/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/ChatGPT_Image_Jul_24__2025__04_18_40_PM-removebg-preview.png" 
              alt="Fruitika" 
              width={300} 
              height={90} 
              className="h-24" 
              style={{ width: 'auto' }}
            />
          </Link>
          <Button variant="outline" className="border-[#8FBC8F] text-[#2F5233]" asChild>
            <Link href="/">Back to Store</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-[#8FBC8F] rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#2F5233]">Welcome back, {user.name}!</h1>
            <p className="text-[#5A6B5D]">Manage your account and orders</p>
          </div>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="bg-[#fefcf5] border border-[#8FBC8F]/20">
            <TabsTrigger value="orders" className="data-[state=active]:bg-[#2F5233] data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-[#2F5233] data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#2F5233] data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
              <CardHeader>
                <CardTitle className="text-[#2F5233]">Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-[#5A6B5D]">Loading orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-[#5A6B5D]">No orders found</p>
                    <Button asChild className="mt-4 bg-[#2F5233] hover:bg-[#8FBC8F]">
                      <Link href="/products">Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border border-[#8FBC8F]/20 rounded-lg">
                        <div>
                          <p className="font-semibold text-[#2F5233]">Order #{order.id}</p>
                          <p className="text-sm text-[#5A6B5D]">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                          <p className="text-sm text-[#5A6B5D]">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-center">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#2F5233]">${order.total.toFixed(2)}</p>
                          <Button variant="outline" size="sm" className="mt-1 border-[#8FBC8F] text-[#2F5233]" asChild>
                            <Link href={`/orders/${order.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
              <CardHeader>
                <CardTitle className="text-[#2F5233]">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2F5233] mb-1">Name</label>
                  <p className="p-2 bg-white border border-[#8FBC8F]/30 rounded">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2F5233] mb-1">Email</label>
                  <p className="p-2 bg-white border border-[#8FBC8F]/30 rounded">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2F5233] mb-1">Account Type</label>
                  <p className="p-2 bg-white border border-[#8FBC8F]/30 rounded">{user.role || 'User'}</p>
                </div>
                <Button className="bg-[#2F5233] hover:bg-[#8FBC8F] text-white">Edit Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
              <CardHeader>
                <CardTitle className="text-[#2F5233]">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-[#8FBC8F]/20 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-[#2F5233]">Email Notifications</h3>
                    <p className="text-sm text-[#5A6B5D]">Receive updates about your orders</p>
                  </div>
                  <Button variant="outline" className="border-[#8FBC8F] text-[#2F5233]">Enabled</Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-[#8FBC8F]/20 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-[#2F5233]">Change Password</h3>
                    <p className="text-sm text-[#5A6B5D]">Update your account password</p>
                  </div>
                  <Button variant="outline" className="border-[#8FBC8F] text-[#2F5233]">Change</Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-red-600">Delete Account</h3>
                    <p className="text-sm text-red-500">Permanently delete your account</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-red-300 text-red-600 hover:bg-red-50"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}