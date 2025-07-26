"use client"

import { useCart } from "@/lib/CartContext"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export default function CartPage() {
  const { items: cartItems, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } = useCart()

  const handleUpdateQuantity = (id: number, change: number) => {
    const item = cartItems.find(item => item.id === id)
    if (item) {
      updateQuantity(id, item.quantity + change)
    }
  }

  const subtotal = getTotalPrice()
  const shipping = 15.99
  const total = subtotal + shipping

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
            <Link href="/about" className="text-[#2F5233] hover:text-[#2F5233] transition-colors">About</Link>
            <Link href="/contact" className="text-[#2F5233] hover:text-[#2F5233] transition-colors">Contact</Link>
          </nav>
          <Button className="bg-[#2F5233] hover:bg-[#8FBC8F] text-white">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Cart ({getTotalItems()})
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#2F5233] mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-[#8FBC8F] mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-[#2F5233] mb-4">Your cart is empty</h2>
            <Button className="bg-[#2F5233] hover:bg-[#8FBC8F] text-white" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="border-[#8FBC8F]/20 bg-[#fefcf5]">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-lg" />
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-[#2F5233]">{item.name}</h3>
                        <p className="text-[#5A6B5D]">${item.price} per kg</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(item.id, -1)}>
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                        <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(item.id, 1)}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-xl font-bold text-[#2F5233] min-w-[80px]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <Card className="border-[#8FBC8F]/20 bg-[#fefcf5] sticky top-32">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[#2F5233] mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#5A6B5D]">Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5A6B5D]">Shipping</span>
                      <span className="font-semibold">${shipping.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold text-[#2F5233]">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-[#2F5233] hover:bg-[#8FBC8F] text-white" asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button variant="outline" className="w-full mt-2 border-[#8FBC8F] text-[#2F5233]" asChild>
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}