import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Force no caching
    const headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Timestamp': new Date().toISOString()
    }

    // Original SQLite products
    const originalProducts = [
      {
        id: "1",
        name: "Sweet Lime",
        price: 24.99,
        description: "Fresh, juicy sweet limes perfect for export",
        category: "citrus",
        image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&h=400&fit=crop&crop=center",
        images: [
          "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500&h=500&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500&h=500&fit=crop&crop=faces",
          "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500&h=500&fit=crop&crop=entropy"
        ],
        rating: 4.8,
        featured: true,
        inStock: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "2", 
        name: "Premium Oranges",
        price: 19.99,
        description: "Hand-picked Valencia oranges with exceptional sweetness",
        category: "citrus",
        image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop&crop=center",
        images: [
          "https://images.unsplash.com/photo-1547514701-42782101795e?w=500&h=500&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1547514701-42782101795e?w=500&h=500&fit=crop&crop=faces",
          "https://images.unsplash.com/photo-1547514701-42782101795e?w=500&h=500&fit=crop&crop=entropy"
        ],
        rating: 4.9,
        featured: true,
        inStock: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "3",
        name: "Tropical Mangoes",
        price: 34.99,
        description: "Alphonso mangoes - the king of fruits",
        category: "tropical", 
        image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop&crop=center",
        images: [
          "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop&crop=faces",
          "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop&crop=entropy"
        ],
        rating: 4.7,
        featured: false,
        inStock: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "4",
        name: "Fresh Pineapples",
        price: 29.99,
        description: "Golden ripe pineapples with natural sweetness",
        category: "tropical",
        image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop&crop=center",
        images: [
          "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&h=500&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&h=500&fit=crop&crop=faces",
          "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&h=500&fit=crop&crop=entropy"
        ], 
        rating: 4.6,
        featured: false,
        inStock: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "5",
        name: "Seasonal Apples",
        price: 22.99,
        description: "Crisp and fresh seasonal apples",
        category: "seasonal",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop&crop=center",
        images: [
          "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop&crop=faces",
          "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop&crop=entropy"
        ],
        rating: 4.5,
        featured: false,
        inStock: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "6",
        name: "Dragon Fruit",
        price: 39.99,
        description: "Exotic dragon fruit with unique flavor",
        category: "tropical",
        image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=400&h=400&fit=crop&crop=center",
        images: [
          "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=500&h=500&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=500&h=500&fit=crop&crop=faces",
          "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=500&h=500&fit=crop&crop=entropy"
        ],
        rating: 4.8,
        featured: true,
        inStock: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]

    const product = originalProducts.find(p => p.id === id)
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404, headers })
    }

    return NextResponse.json(product, { headers })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  }
}
