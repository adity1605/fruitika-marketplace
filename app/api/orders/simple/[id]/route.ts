import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // For now, return a mock order since we don't have persistent storage
    // In a real app, you'd fetch this from a database
    const mockOrder = {
      id: id,
      status: 'confirmed',
      total: 125.96,
      subtotal: 110.96,
      shipping: 15.00,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      customerInfo: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@fruitika.com',
        phone: '+91 9876543210',
        address: '123 Test Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
      },
      items: [
        {
          id: 'item_1',
          productId: '1',
          name: 'Sweet Lime',
          price: 24.99,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop&crop=center'
        },
        {
          id: 'item_2', 
          productId: '2',
          name: 'Premium Oranges',
          price: 19.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=300&h=300&fit=crop&crop=center'
        }
      ],
      trackingInfo: {
        current: 'confirmed',
        steps: [
          { step: 'confirmed', completed: true, timestamp: new Date().toISOString() },
          { step: 'processing', completed: false, timestamp: null },
          { step: 'shipped', completed: false, timestamp: null },
          { step: 'delivered', completed: false, timestamp: null }
        ]
      }
    }

    return NextResponse.json({ order: mockOrder })
  } catch (error) {
    console.error('Order fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 })
  }
}
