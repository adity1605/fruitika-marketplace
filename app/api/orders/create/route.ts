import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, items, total, subtotal, shipping, paymentId, customerInfo } = body

    if (!userId) {
      return NextResponse.json({ error: 'User authentication required' }, { status: 401 })
    }

    console.log('Creating order for user:', userId)

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        subtotal,
        shipping,
        status: 'confirmed',
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    return NextResponse.json({ orderId: order.id, order })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}