"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, Star, ShoppingCart, Menu, X } from "lucide-react"
import { useCart } from "@/lib/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"



interface Product {
  id: string
  name: string
  price: number
  description?: string
  category?: string
  images?: string[]
  image?: string
  rating?: number
  featured?: boolean
  inStock?: boolean
}

export default function ProductsPage() {
  const { getTotalItems } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, sortBy, searchTerm])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCategory !== 'all') params.append('category', selectedCategory)
      if (searchTerm) params.append('search', searchTerm)
      if (sortBy) params.append('sortBy', sortBy)
      
      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="min-h-screen bg-[#f9f4e7]">
      {/* Header */}
      <header className="bg-transparent backdrop-blur-sm border-b border-[#8FBC8F]/20 sticky top-0 z-50">
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
          <div className="flex items-center space-x-4">
            <Button className="bg-[#2F5233] hover:bg-[#8FBC8F] text-white" asChild>
              <Link href="/cart">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart ({getTotalItems()})
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#fefcf5] border-t border-[#8FBC8F]/20">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link href="/" className="block text-[#2F5233] hover:text-[#8FBC8F] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/products" className="block text-[#2F5233] font-semibold" onClick={() => setMobileMenuOpen(false)}>
                Products
              </Link>
              <Link href="/about" className="block text-[#2F5233] hover:text-[#8FBC8F] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/contact" className="block text-[#2F5233] hover:text-[#8FBC8F] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <Button className="w-full bg-[#2F5233] hover:bg-[#8FBC8F] text-white" asChild>
                <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart ({getTotalItems()})
                </Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2F5233] mb-4">Our Premium Products</h1>
          <p className="text-xl text-[#5A6B5D] max-w-2xl mx-auto">
            Discover our carefully selected range of fresh, organic fruits sourced from the finest orchards
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#fefcf5] rounded-lg shadow-sm border border-[#8FBC8F]/20 p-6 mb-8"
        >
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5A6B5D] w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#8FBC8F]/30 focus:border-[#2F5233]"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border-[#8FBC8F]/30 focus:border-[#2F5233]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="citrus">Citrus Fruits</SelectItem>
                <SelectItem value="tropical">Tropical Fruits</SelectItem>
                <SelectItem value="seasonal">Seasonal Fruits</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-[#8FBC8F]/30 focus:border-[#2F5233]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-[#5A6B5D] flex items-center">{products.length} products found</div>
          </div>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="text-2xl text-[#2F5233]">Loading products...</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-[#8FBC8F]/20 hover:shadow-lg transition-all duration-300 group overflow-hidden h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.jpg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.featured && (
                    <Badge className="absolute top-4 left-4 bg-[#F4C430] text-[#2F5233]">Featured</Badge>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6 flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-[#2F5233]">{product.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-[#F4C430] text-[#F4C430]" />
                      <span className="text-sm text-[#5A6B5D]">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-[#5A6B5D] mb-4">{product.description}</p>
                  <div className="text-2xl font-bold text-[#2F5233]">${product.price}</div>
                </CardContent>

                <CardFooter className="p-6 pt-0 mt-auto">
                  <Button
                    className="w-full bg-[#2F5233] hover:bg-[#8FBC8F] text-white"
                    disabled={!product.inStock}
                    asChild
                  >
                    <Link href={`/products/${product.id}`}>{product.inStock ? "View Details" : "Out of Stock"}</Link>
                  </Button>
                </CardFooter>
              </Card>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-[#2F5233] mb-2">No products found</h3>
            <p className="text-[#5A6B5D]">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
