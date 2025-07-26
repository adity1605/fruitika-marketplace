import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    console.log('Products API called, DATABASE_URL exists:', !!process.env.DATABASE_URL)
    
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL not found, returning mock data')
      return NextResponse.json(getMockProducts())
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy')

    console.log('Query params:', { category, search, sortBy })

    let where: any = {}
    
    if (category && category !== 'all') {
      where.category = category
    }
    
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive'
      }
    }

    let orderBy: any = { createdAt: 'desc' }
    
    if (sortBy === 'price-low') {
      orderBy = { price: 'asc' }
    } else if (sortBy === 'price-high') {
      orderBy = { price: 'desc' }
    } else if (sortBy === 'rating') {
      orderBy = { rating: 'desc' }
    } else if (sortBy === 'featured') {
      orderBy = { featured: 'desc' }
    }

    console.log('Querying database with:', { where, orderBy })

    const products = await prisma.product.findMany({
      where,
      orderBy
    })

    console.log('Found products:', products.length)
    
    if (products.length === 0) {
      console.log('No products found in database, returning mock data')
      return NextResponse.json(getMockProducts())
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    console.log('Database error, returning mock data')
    return NextResponse.json(getMockProducts())
  }
}

function getMockProducts() {
  return [
    {
      id: "1",
      name: "Fresh Apples",
      price: 4.99,
      description: "Crisp and juicy red apples, perfect for snacking or baking.",
      category: "fruits",
      image: "/placeholder.jpg",
      images: ["/placeholder.jpg"],
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
      images: ["/placeholder.jpg"],
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
      images: ["/placeholder.jpg"],
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
      images: ["/placeholder.jpg"], 
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
      images: ["/images/hero-oranges.avif"],
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
      images: ["/placeholder.jpg"],
      rating: 4.8,
      featured: true,
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}