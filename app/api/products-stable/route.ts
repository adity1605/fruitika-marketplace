import { NextResponse } from 'next/server'
import { simpleDB } from '../../../lib/simpleDB'

export async function GET() {
  try {
    const products = simpleDB.products.getAll()
    
    return NextResponse.json(products, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
