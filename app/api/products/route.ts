import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL not found')
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy')

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

    const products = await prisma.product.findMany({
      where,
      orderBy
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    
    // Return mock data if database fails
    const mockProducts = [
      {
        id: "1",
        name: "Fresh Apples",
        price: 4.99,
        description: "Crisp and juicy red apples, perfect for snacking or baking.",
        category: "fruits",
        image: "/images/apple.jpg",
        rating: 4.5,
        featured: true,
        inStock: true,
      },
      {
        id: "2", 
        name: "Organic Bananas",
        price: 2.99,
        description: "Sweet organic bananas, rich in potassium and perfect for smoothies.",
        category: "fruits",
        image: "/images/banana.jpg",
        rating: 4.2,
        featured: true,
        inStock: true,
      }
    ]
    
    return NextResponse.json(mockProducts)
  }
}