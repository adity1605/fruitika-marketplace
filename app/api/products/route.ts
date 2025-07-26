import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
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
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}