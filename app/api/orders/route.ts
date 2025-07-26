import { NextRequest, NextResponse } from 'next/server'
import { simpleDB } from '@/lib/simpleDB'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (userId) {
      // Get orders for the specific user
      const userOrders = simpleDB.orders.getByUserId(userId)
      return NextResponse.json({ 
        success: true, 
        orders: userOrders 
      })
    } else {
      // If no userId provided, return all orders (for admin)
      const allOrders = simpleDB.orders.getAll()
      return NextResponse.json({ 
        success: true, 
        orders: allOrders 
      })
    }
  } catch (error) {
    console.error('Orders fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

// Admin endpoint to get all orders
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { adminId, action } = body
    
    // Check if user is admin
    const user = simpleDB.users.findById(adminId)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }
    
    if (action === 'getAllOrders') {
      const allOrders = simpleDB.orders.getAll()
      return NextResponse.json({ 
        success: true, 
        orders: allOrders 
      })
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Admin orders error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}