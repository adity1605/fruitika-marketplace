"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/lib/CartContext"
import { useAuth } from "@/lib/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface TestResult {
  name: string
  status: 'pass' | 'fail' | 'warning'
  message: string
}

export default function SystemTest() {
  const { addToCart, getTotalItems, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const [results, setResults] = useState<TestResult[]>([])
  const [testing, setTesting] = useState(false)

  const runTests = async () => {
    setTesting(true)
    const testResults: TestResult[] = []

    // Test 1: Cart Persistence
    try {
      clearCart()
      addToCart({ id: 999, name: "Test Product", price: 1.00, image: "/test.jpg" })
      const count = getTotalItems()
      if (count === 1) {
        testResults.push({ name: "Cart Functionality", status: "pass", message: "Cart adding items works" })
      } else {
        testResults.push({ name: "Cart Functionality", status: "fail", message: "Cart not adding items properly" })
      }
    } catch (error) {
      testResults.push({ name: "Cart Functionality", status: "fail", message: "Cart error: " + error })
    }

    // Test 2: Products API
    try {
      const response = await fetch('/api/products-stable')
      const products = await response.json()
      if (Array.isArray(products) && products.length > 0) {
        testResults.push({ name: "Products API", status: "pass", message: `Loaded ${products.length} products` })
      } else {
        testResults.push({ name: "Products API", status: "fail", message: "No products returned" })
      }
    } catch (error) {
      testResults.push({ name: "Products API", status: "fail", message: "Products API error" })
    }

    // Test 3: Orders API
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      if (data.success) {
        testResults.push({ name: "Orders API", status: "pass", message: `Orders API working, ${data.orders?.length || 0} orders` })
      } else {
        testResults.push({ name: "Orders API", status: "warning", message: "Orders API response format issue" })
      }
    } catch (error) {
      testResults.push({ name: "Orders API", status: "fail", message: "Orders API error" })
    }

    // Test 4: Contact API
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "Test User",
          email: "test@test.com",
          message: "System test message"
        })
      })
      const data = await response.json()
      if (data.success) {
        testResults.push({ name: "Contact Form", status: "pass", message: "Contact form submission works" })
      } else {
        testResults.push({ name: "Contact Form", status: "fail", message: "Contact form failed" })
      }
    } catch (error) {
      testResults.push({ name: "Contact Form", status: "fail", message: "Contact form error" })
    }

    // Test 5: Authentication
    if (isAuthenticated && user) {
      testResults.push({ name: "Authentication", status: "pass", message: `Logged in as ${user.name}` })
    } else {
      testResults.push({ name: "Authentication", status: "warning", message: "Not authenticated (test with login)" })
    }

    // Test 6: Admin Panel Access
    try {
      const response = await fetch('/api/contact')
      if (response.ok) {
        testResults.push({ name: "Admin Panel Data", status: "pass", message: "Admin endpoints accessible" })
      } else {
        testResults.push({ name: "Admin Panel Data", status: "fail", message: "Admin endpoints not working" })
      }
    } catch (error) {
      testResults.push({ name: "Admin Panel Data", status: "fail", message: "Admin panel error" })
    }

    setResults(testResults)
    setTesting(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'fail': return <XCircle className="w-5 h-5 text-red-500" />
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />
      default: return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pass: "bg-green-100 text-green-800",
      fail: "bg-red-100 text-red-800", 
      warning: "bg-yellow-100 text-yellow-800"
    }
    return variants[status as keyof typeof variants] || variants.warning
  }

  return (
    <div className="min-h-screen bg-[#f9f4e7] p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="border-[#8FBC8F]/20 bg-[#fefcf5] mb-6">
          <CardHeader>
            <CardTitle className="text-[#2F5233] text-2xl">🔧 Fruitika System Health Check</CardTitle>
            <p className="text-[#5A6B5D]">
              Comprehensive testing of all website functionality
            </p>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={runTests} 
              disabled={testing}
              className="bg-[#2F5233] hover:bg-[#8FBC8F] text-white"
            >
              {testing ? "Running Tests..." : "Run System Tests"}
            </Button>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
            <CardHeader>
              <CardTitle className="text-[#2F5233]">Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-[#8FBC8F]/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(result.status)}
                      <div>
                        <h4 className="font-semibold text-[#2F5233]">{result.name}</h4>
                        <p className="text-sm text-[#5A6B5D]">{result.message}</p>
                      </div>
                    </div>
                    <Badge className={getStatusBadge(result.status)}>
                      {result.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="border-[#8FBC8F]/20 bg-[#fefcf5] mt-6">
          <CardHeader>
            <CardTitle className="text-[#2F5233]">Quick Debug Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" onClick={clearCart} className="border-[#8FBC8F] text-[#2F5233]">
                Clear Cart
              </Button>
              <Button variant="outline" asChild className="border-[#8FBC8F] text-[#2F5233]">
                <a href="/admin-panel">Admin Panel</a>
              </Button>
              <Button variant="outline" asChild className="border-[#8FBC8F] text-[#2F5233]">
                <a href="/dashboard">Dashboard</a>
              </Button>
              <Button variant="outline" asChild className="border-[#8FBC8F] text-[#2F5233]">
                <a href="/products">Products</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card className="border-[#8FBC8F]/20 bg-[#fefcf5] mt-6">
          <CardHeader>
            <CardTitle className="text-[#2F5233]">System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Cart Items:</strong> {getTotalItems()}
              </div>
              <div>
                <strong>User:</strong> {user ? `${user.name} (${user.email})` : 'Not logged in'}
              </div>
              <div>
                <strong>Auth Status:</strong> {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
              </div>
              <div>
                <strong>Timestamp:</strong> {new Date().toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
