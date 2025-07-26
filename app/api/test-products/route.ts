import { NextResponse } from 'next/server'

export async function GET() {
  const testProducts = [
    {
      id: "1",
      name: "Sweet Lime - TEST",
      price: 24.99,
      description: "Fresh, juicy sweet limes perfect for export",
      category: "citrus",
      image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      featured: true,
      inStock: true,
      timestamp: new Date().toISOString()
    },
    {
      id: "2", 
      name: "Premium Oranges - TEST",
      price: 19.99,
      description: "Hand-picked Valencia oranges with exceptional sweetness",
      category: "citrus",
      image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      featured: true,
      inStock: true,
      timestamp: new Date().toISOString()
    }
  ]
  
  return NextResponse.json({
    message: "Test endpoint with original products",
    deployment_time: new Date().toISOString(),
    products: testProducts
  })
}
