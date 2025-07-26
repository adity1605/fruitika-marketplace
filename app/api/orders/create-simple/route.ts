import { NextRequest, NextResponse } from 'next/server'
import { simpleDB } from '@/lib/simpleDB'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, items, total, subtotal, shipping, paymentId, customerInfo } = body

    console.log('Order creation request:', { userId, itemsCount: items?.length, total })

    if (!userId && !customerInfo?.email) {
      return NextResponse.json({ error: 'User authentication or customer info required' }, { status: 401 })
    }

    // Create order using simple database
    const order = simpleDB.orders.create({
      userId: userId || 'guest',
      total,
      subtotal,
      shipping,
      status: 'confirmed',
      paymentId,
      customerInfo,
      items: items.map((item: any) => ({
        id: `ITEM_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.name || `Product ${item.productId}`,
        image: item.image || '/placeholder.jpg'
      }))
    })

    console.log('Order created successfully:', order.id)

    return NextResponse.json({ 
      success: true,
      orderId: order.id, 
      order,
      message: 'Order created successfully'
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ 
      error: 'Failed to create order',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
