import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Get all orders for debugging
    const allOrders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        },
        user: true
      },
      orderBy: { createdAt: 'desc' }
    })

    console.log('All orders in database:', allOrders.map((o: any) => ({ id: o.id, userId: o.userId, userEmail: o.user.email })))

    // For now, return all orders to test
    return NextResponse.json({ orders: allOrders })
  } catch (error) {
    console.error('Orders fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}