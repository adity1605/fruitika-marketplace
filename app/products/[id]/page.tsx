"use client"

import { useState, use, useEffect } from "react"
import { motion } from "framer-motion"
import { useCart } from "@/lib/CartContext"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, Plus, Minus, ShoppingCart, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface Product {
  id: string
  name: string
  price: number
  description?: string
  category?: string
  images?: string[]
  rating?: number
  featured?: boolean
}

interface ProductWithDefaults extends Product {
  reviews: number
  rating: number
  images: string[]
  features: string[]
  specifications: {
    Origin: string
    Variety: string
    Size: string
    Packaging: string
    "Shelf Life": string
    "Minimum Order": string
  }
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { addToCart, getTotalItems } = useCart()
  const resolvedParams = use(params)

  useEffect(() => {
    fetchProduct()
  }, [resolvedParams.id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/products-new/${resolvedParams.id}?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      const data = await response.json()
      if (response.ok) {
        setProduct({
          ...data,
          images: data.images || [data.image] // Use images array or fallback to single image
        })
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f4e7] flex items-center justify-center">
        <div className="text-2xl text-[#2F5233]">Loading product...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f9f4e7] flex items-center justify-center">
        <div className="text-2xl text-[#2F5233]">Product not found</div>
      </div>
    )
  }

    const productWithDefaults: ProductWithDefaults = {
    ...(product || { id: '', name: '', price: 0 }),
    rating: product?.rating || 4.5,
    images: product?.images || ["/placeholder.jpg"],
    reviews: 156,
    features: [
      "100% Organic and pesticide-free",
      "Hand-picked at optimal ripeness",
      "Rich in Vitamin C and antioxidants",
      "Perfect for juicing and direct consumption",
      "Carefully packaged for export quality",
    ],
    specifications: {
      Origin: "Premium Indian Farms",
      Variety: product?.name || "Fresh Fruit",
      Size: "Medium to Large",
      Packaging: "Eco-friendly Packaging",
      "Shelf Life": "7-10 days",
      "Minimum Order": "10 kg"
    }
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  return (
    <div className="min-h-screen bg-[#f9f4e7]">
      {/* Header */}
      <header className="bg-[#f9f4e7]/80 backdrop-blur-[2px] border-b border-[#8FBC8F]/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/images/ChatGPT_Image_Jul_24__2025__04_18_40_PM-removebg-preview.png" alt="Fruitika" width={300} height={90} className="h-24 w-auto" />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-[#2F5233] hover:text-[#2F5233] transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-[#2F5233] font-semibold">
              Products
            </Link>
            <Link href="/about" className="text-[#2F5233] hover:text-[#2F5233] transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-[#2F5233] hover:text-[#2F5233] transition-colors">
              Contact
            </Link>
          </nav>
          <Button className="bg-[#2F5233] hover:bg-[#8FBC8F] text-white" asChild>
            <Link href="/cart">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart ({getTotalItems()})
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-[#5A6B5D] mb-8"
        >
          <Link href="/products" className="flex items-center hover:text-[#2F5233] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-[#fefcf5] shadow-sm">
              <Image
                src={productWithDefaults.images[selectedImage] || "/placeholder.jpg"}
                alt={productWithDefaults.name}
                width={500}
                height={500}
                className="w-full h-96 object-cover"
              />
              {productWithDefaults.featured && (
                <Badge className="absolute top-4 left-4 bg-[#F4C430] text-[#2F5233]">Featured</Badge>
              )}
            </div>

            <div className="flex space-x-4">
              {productWithDefaults.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index ? "border-[#2F5233]" : "border-[#8FBC8F]/30"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.jpg"}
                    alt={`${productWithDefaults.name} ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-20 h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-[#2F5233] mb-2">{productWithDefaults.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(productWithDefaults.rating) ? "fill-[#F4C430] text-[#F4C430]" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-[#5A6B5D] ml-2">
                    {productWithDefaults.rating} ({productWithDefaults.reviews} reviews)
                  </span>
                </div>
              </div>
              <div className="text-3xl font-bold text-[#2F5233] mb-4">
                ${productWithDefaults.price} <span className="text-lg text-[#5A6B5D] font-normal">per kg</span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-[#2F5233] mb-3">Description</h3>
              <p className="text-[#5A6B5D] leading-relaxed">{productWithDefaults.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#2F5233] mb-3">Key Features</h3>
              <ul className="space-y-2">
                {productWithDefaults.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#2F5233] rounded-full mt-2 flex-shrink-0" />
                    <span className="text-[#5A6B5D]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="text-lg font-semibold text-[#2F5233] mb-2 block">Quantity (kg)</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-[#8FBC8F]/30 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      className="px-3 py-2 hover:bg-[#8FBC8F]/20"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 text-lg font-semibold">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      className="px-3 py-2 hover:bg-[#8FBC8F]/20"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-[#5A6B5D]">
                    Total:{" "}
                    <span className="font-semibold text-[#2F5233]">${(productWithDefaults.price * quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  size="lg" 
                  className="flex-1 bg-[#2F5233] hover:bg-[#8FBC8F] text-white"
                  onClick={() => {
                    addToCart({
                      id: parseInt(productWithDefaults.id) || 1,
                      name: productWithDefaults.name,
                      price: productWithDefaults.price,
                      image: productWithDefaults.images[0],
                      quantity
                    })
                  }}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#8FBC8F] text-[#2F5233] hover:bg-[#8FBC8F] hover:text-white bg-transparent"
                >
                  <Heart className="w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#8FBC8F] text-[#2F5233] hover:bg-[#8FBC8F] hover:text-white bg-transparent"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Specifications */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mt-16">
          <Card className="border-[#8FBC8F]/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-[#2F5233] mb-6">Product Specifications</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(productWithDefaults.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-[#8FBC8F]/20">
                    <span className="font-semibold text-[#2F5233]">{key}:</span>
                    <span className="text-[#5A6B5D]">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
