"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Quote, Briefcase, Shield, ShoppingCart } from "lucide-react"

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  createdAt: string
}

interface QuoteRequest {
  id: string
  name: string
  email: string
  product: string
  quantity: string
  destination: string
  status: string
  createdAt: string
}

interface JobApplication {
  id: string
  name: string
  email: string
  position: string
  experience: string
  resumeUrl?: string
  status: string
  createdAt: string
}

interface Order {
  id: string
  userId: string
  status: string
  total: number
  subtotal: number
  shipping: number
  createdAt: string
  user: {
    name: string
    email: string
  }
  items: {
    id: string
    quantity: number
    price: number
    product: {
      name: string
    }
  }[]
}

export default function AdminPanelPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")

  useEffect(() => {
    // Simple password check
    const adminAuth = localStorage.getItem('adminAuth')
    if (adminAuth === 'authenticated') {
      setAuthenticated(true)
      fetchData()
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogin = () => {
    if (password === 'admin123') {
      localStorage.setItem('adminAuth', 'authenticated')
      setAuthenticated(true)
      fetchData()
    } else {
      alert('Invalid password')
    }
  }

  const fetchData = async () => {
    try {
      // Fetch contacts
      const contactsRes = await fetch('/api/contact')
      if (contactsRes.ok) {
        const contactsData = await contactsRes.json()
        setContacts(Array.isArray(contactsData) ? contactsData : [])
      }

      // Fetch quotes  
      const quotesRes = await fetch('/api/quote')
      if (quotesRes.ok) {
        const quotesData = await quotesRes.json()
        setQuotes(Array.isArray(quotesData) ? quotesData : [])
      }

      // Fetch careers
      const careersRes = await fetch('/api/careers')
      if (careersRes.ok) {
        const careersData = await careersRes.json()
        setApplications(Array.isArray(careersData) ? careersData : [])
      }

      // Fetch orders (all orders for admin)
      const ordersRes = await fetch('/api/orders')
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json()
        if (ordersData.success && Array.isArray(ordersData.orders)) {
          setOrders(ordersData.orders)
        } else {
          setOrders([])
        }
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    setAuthenticated(false)
    setPassword("")
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#f9f4e7] flex items-center justify-center">
        <Card className="w-full max-w-md border-[#8FBC8F]/20 bg-[#fefcf5]">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 text-[#2F5233] mx-auto mb-4" />
            <CardTitle className="text-[#2F5233]">Admin Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-[#2F5233] mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-[#8FBC8F]/30 rounded focus:border-[#2F5233] outline-none"
                placeholder="Enter admin password"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full bg-[#2F5233] hover:bg-[#8FBC8F]">
              Access Admin Panel
            </Button>
            <div className="text-center">
              <Link href="/" className="text-sm text-[#5A6B5D] hover:text-[#2F5233]">
                ← Back to Website
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f4e7] flex items-center justify-center">
        <div className="text-2xl text-[#2F5233]">Loading admin data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f4e7] p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#2F5233] mb-2">Admin Dashboard</h1>
            <p className="text-[#5A6B5D]">Manage Fruitika submissions and requests</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleLogout} className="border-red-300 text-red-600">
              Logout
            </Button>
            <Button variant="outline" asChild className="border-[#8FBC8F] text-[#2F5233]">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Website
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#5A6B5D] text-sm">Contact Messages</p>
                  <p className="text-3xl font-bold text-[#2F5233]">{contacts.length}</p>
                </div>
                <Mail className="w-8 h-8 text-[#2F5233]" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#5A6B5D] text-sm">Quote Requests</p>
                  <p className="text-3xl font-bold text-[#2F5233]">{quotes.length}</p>
                </div>
                <Quote className="w-8 h-8 text-[#2F5233]" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#5A6B5D] text-sm">Job Applications</p>
                  <p className="text-3xl font-bold text-[#2F5233]">{applications.length}</p>
                </div>
                <Briefcase className="w-8 h-8 text-[#2F5233]" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#5A6B5D] text-sm">Orders</p>
                  <p className="text-3xl font-bold text-[#2F5233]">{orders.length}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-[#2F5233]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Messages */}
        <Card className="border-[#8FBC8F]/20 bg-[#fefcf5] mb-8">
          <CardHeader>
            <CardTitle className="text-[#2F5233] flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Contact Messages ({contacts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {contacts.length === 0 ? (
                <p className="text-[#5A6B5D] text-center py-8">No contact messages yet</p>
              ) : (
                contacts.map((contact) => (
                  <div key={contact.id} className="border-b border-[#8FBC8F]/20 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-[#2F5233]">{contact.name}</h4>
                        <p className="text-sm text-[#5A6B5D]">{contact.email}</p>
                        {contact.phone && <p className="text-sm text-[#5A6B5D]">📞 {contact.phone}</p>}
                        {contact.company && <p className="text-sm text-[#5A6B5D]">🏢 {contact.company}</p>}
                      </div>
                      <span className="text-xs text-[#5A6B5D]">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-[#5A6B5D]">{contact.message}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quote Requests */}
        <Card className="border-[#8FBC8F]/20 bg-[#fefcf5] mb-8">
          <CardHeader>
            <CardTitle className="text-[#2F5233] flex items-center">
              <Quote className="w-5 h-5 mr-2" />
              Quote Requests ({quotes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {quotes.length === 0 ? (
                <p className="text-[#5A6B5D] text-center py-8">No quote requests yet</p>
              ) : (
                quotes.map((quote) => (
                  <div key={quote.id} className="border-b border-[#8FBC8F]/20 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-[#2F5233]">{quote.name}</h4>
                        <p className="text-sm text-[#5A6B5D]">{quote.email}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">{quote.status}</Badge>
                        <p className="text-xs text-[#5A6B5D]">
                          {new Date(quote.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-[#5A6B5D]">
                      <p><strong>Product:</strong> {quote.product}</p>
                      <p><strong>Quantity:</strong> {quote.quantity}</p>
                      <p><strong>Destination:</strong> {quote.destination}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Orders */}
        <Card className="border-[#8FBC8F]/20 bg-[#fefcf5] mb-8">
          <CardHeader>
            <CardTitle className="text-[#2F5233] flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Orders ({orders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {orders.length === 0 ? (
                <p className="text-[#5A6B5D] text-center py-8">No orders placed yet</p>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="border-b border-[#8FBC8F]/20 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-[#2F5233]">Order #{order.id}</h4>
                        <p className="text-sm text-[#5A6B5D]">User ID: {order.userId}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">{order.status}</Badge>
                        <p className="text-xs text-[#5A6B5D]">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-[#5A6B5D]">
                      <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                      <p><strong>Items:</strong> {order.items.map((item: any) => `${item.name} (${item.quantity})`).join(', ')}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Job Applications */}
        <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
          <CardHeader>
            <CardTitle className="text-[#2F5233] flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Job Applications ({applications.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {applications.length === 0 ? (
                <p className="text-[#5A6B5D] text-center py-8">No job applications yet</p>
              ) : (
                applications.map((app) => (
                  <div key={app.id} className="border-b border-[#8FBC8F]/20 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-[#2F5233]">{app.name}</h4>
                        <p className="text-sm text-[#5A6B5D]">{app.email}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">{app.status}</Badge>
                        <p className="text-xs text-[#5A6B5D]">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-[#5A6B5D]">
                      <p><strong>Position:</strong> {app.position}</p>
                      <p><strong>Experience:</strong> {app.experience}</p>
                      {app.resumeUrl && <p><strong>Resume:</strong> {app.resumeUrl}</p>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}