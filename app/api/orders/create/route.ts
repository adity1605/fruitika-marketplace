import { NextRequest, NextResponse } from 'next/server'
import { simpleDB } from '@/lib/simpleDB'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, items, total, subtotal, shipping, paymentId, customerInfo } = body

    if (!userId) {
      return NextResponse.json({ error: 'User authentication required' }, { status: 401 })
    }

    console.log('Creating order for user:', userId)

    const order = simpleDB.orders.create({
      userId,
      total,
      subtotal,
      shipping,
      status: 'confirmed',
      items: items.map((item: any) => ({
        id: item.productId,
        name: item.name || 'Product',
        quantity: item.quantity,
        price: item.price
      })),
      customerInfo: customerInfo || {},
      paymentId: paymentId || undefined
    })

    return NextResponse.json({ orderId: order.id, order })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}