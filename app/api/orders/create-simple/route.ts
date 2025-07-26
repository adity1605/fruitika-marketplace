import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, items, total, subtotal, shipping, paymentId, customerInfo } = body

    console.log('Order creation request:', { userId, itemsCount: items?.length, total })

    if (!userId && !customerInfo?.email) {
      return NextResponse.json({ error: 'User authentication or customer info required' }, { status: 401 })
    }

    // Generate a unique order ID
    const orderId = `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Create a simple order object without database
    const order = {
      id: orderId,
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
      })),
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
    }

    console.log('Order created successfully:', orderId)

    // In a real app, you'd save this to a database
    // For now, we'll just return the order data
    
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
