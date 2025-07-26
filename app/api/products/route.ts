import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    console.log('Products API called, DATABASE_URL exists:', !!process.env.DATABASE_URL)
    console.log('Serving original SQLite products with Unsplash images')
    
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
      name: "Sweet Lime",
      price: 24.99,
      description: "Fresh, juicy sweet limes perfect for export",
      category: "citrus",
      image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&h=400&fit=crop&crop=center",
      images: [
        "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500&h=500&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500&h=500&fit=crop&crop=entropy"
      ],
      rating: 4.8,
      featured: true,
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "2", 
      name: "Premium Oranges",
      price: 19.99,
      description: "Hand-picked Valencia oranges with exceptional sweetness",
      category: "citrus",
      image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop&crop=center",
      images: [
        "https://images.unsplash.com/photo-1547514701-42782101795e?w=500&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1547514701-42782101795e?w=500&h=500&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1547514701-42782101795e?w=500&h=500&fit=crop&crop=entropy"
      ],
      rating: 4.9,
      featured: true,
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "3",
      name: "Tropical Mangoes",
      price: 34.99,
      description: "Alphonso mangoes - the king of fruits",
      category: "tropical", 
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop&crop=center",
      images: [
        "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop&crop=entropy"
      ],
      rating: 4.7,
      featured: false,
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "4",
      name: "Fresh Pineapples",
      price: 29.99,
      description: "Golden ripe pineapples with natural sweetness",
      category: "tropical",
      image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop&crop=center",
      images: [
        "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&h=500&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&h=500&fit=crop&crop=entropy"
      ], 
      rating: 4.6,
      featured: false,
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "5",
      name: "Seasonal Apples",
      price: 22.99,
      description: "Crisp and fresh seasonal apples",
      category: "seasonal",
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop&crop=center",
      images: [
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop&crop=entropy"
      ],
      rating: 4.5,
      featured: false,
      inStock: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "6",
      name: "Dragon Fruit",
      price: 39.99,
      description: "Exotic dragon fruit with unique flavor",
      category: "tropical",
      image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=400&h=400&fit=crop&crop=center",
      images: [
        "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=500&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=500&h=500&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=500&h=500&fit=crop&crop=entropy"
      ],
      rating: 4.8,
      featured: true,
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}