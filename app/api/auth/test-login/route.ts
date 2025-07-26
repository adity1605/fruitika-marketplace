import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Simple in-memory user store for testing
const testUsers = [
  {
    id: "1",
    name: "Test User",
    email: "test@fruitika.com",
    password: "password123", // In real app, this would be hashed
    role: "user"
  },
  {
    id: "2", 
    name: "Admin User",
    email: "admin@fruitika.com",
    password: "admin123",
    role: "admin"
  }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user in test data
    const user = testUsers.find(u => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    )

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error('Test login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
