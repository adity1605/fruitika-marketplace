import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('Single product API called for ID:', id)
    
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL not found, returning mock product')
      const mockProduct = getMockProductById(id)
      if (!mockProduct) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }
      return NextResponse.json(mockProduct)
    }

    const product = await prisma.product.findUnique({
      where: { id }
    })

    if (!product) {
      console.log('Product not found in database, trying mock data')
      const mockProduct = getMockProductById(id)
      if (!mockProduct) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }
      return NextResponse.json(mockProduct)
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    console.log('Database error, trying mock data for ID:', await params.then(p => p.id))
    const mockProduct = getMockProductById(await params.then(p => p.id))
    if (!mockProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json(mockProduct)
  }
}

function getMockProductById(id: string) {
  const mockProducts = [
    {
      id: "1",
      name: "Fresh Apples",
      price: 4.99,
      description: "Crisp and juicy red apples, perfect for snacking or baking.",
      category: "fruits",
      image: "/placeholder.jpg",
      rating: 4.5,
      featured: true,
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "2", 
      name: "Organic Bananas",
      price: 2.99,
      description: "Sweet organic bananas, rich in potassium and perfect for smoothies.",
      category: "fruits",
      image: "/placeholder.jpg",
      rating: 4.2,
      featured: true,
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "3",
      name: "Fresh Carrots",
      price: 3.49,
      description: "Crunchy orange carrots, great for cooking or raw snacking.",
      category: "vegetables", 
      image: "/placeholder.jpg",
      rating: 4.3,
      featured: false,
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "4",
      name: "Spinach Leaves",
      price: 5.99,
      description: "Fresh green spinach leaves, packed with iron and vitamins.",
      category: "vegetables",
      image: "/placeholder.jpg", 
      rating: 4.1,
      featured: false,
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "5",
      name: "Orange Juice",
      price: 6.99,
      description: "Freshly squeezed orange juice, 100% natural with no added sugar.",
      category: "beverages",
      image: "/images/hero-oranges.avif",
      rating: 4.6,
      featured: true,
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "6",
      name: "Mixed Berries",
      price: 8.99,
      description: "Fresh mixed berries including strawberries, blueberries, and raspberries.",
      category: "fruits",
      image: "/placeholder.jpg",
      rating: 4.8,
      featured: true,
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
  
  return mockProducts.find(product => product.id === id) || null
}