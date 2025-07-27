import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Simple in-memory storage for quotes
interface Quote {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  product: string
  quantity: string
  deliveryLocation: string
  message?: string
  status: string
  createdAt: string
}

// In-memory storage
let quotes: Quote[] = []

const createQuote = (quoteData: Omit<Quote, 'id' | 'createdAt' | 'status'>) => {
  const newQuote: Quote = {
    ...quoteData,
    id: `quote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
  quotes.push(newQuote)
  return newQuote
}

const getAllQuotes = () => quotes

export async function GET() {
  try {
    const allQuotes = getAllQuotes()
    return NextResponse.json(allQuotes)
  } catch (error) {
    console.error('Error fetching quotes:', error)
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Quote API: Request received')
    const body = await request.json()
    console.log('Quote API: Body parsed:', { name: body.name, email: body.email, product: body.product })
    
    const { name, email, phone, company, product, quantity, deliveryLocation, message } = body

    if (!name || !email || !product || !quantity || !deliveryLocation) {
      console.log('Quote API: Validation failed', { 
        name: !!name, 
        email: !!email, 
        product: !!product, 
        quantity: !!quantity, 
        deliveryLocation: !!deliveryLocation 
      })
      return NextResponse.json(
        { error: 'Name, email, product, quantity, and delivery location are required' },
        { status: 400 }
      )
    }

    console.log('Quote API: Creating quote in database...')
    
    // Save to database
    const quote = createQuote({
      name,
      email,
      phone: phone || undefined,
      company: company || undefined,
      product,
      quantity,
      deliveryLocation,
      message: message || undefined
    })
    
    console.log('Quote API: Quote created successfully:', quote.id)

    // Send email notification (only if email config exists)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        })

      // Email to admin
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Quote Request from ${name}`,
        html: `
          <h2>New Quote Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Product:</strong> ${product}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <p><strong>Delivery Location:</strong> ${deliveryLocation}</p>
          <p><strong>Additional Message:</strong></p>
          <p>${message || 'None'}</p>
        `
      })

      // Confirmation email to user
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Quote Request Received - Fruitika',
        html: `
          <h2>Thank you for your quote request!</h2>
          <p>Dear ${name},</p>
          <p>We have received your quote request for <strong>${product}</strong> and will send you a detailed quote within 24 hours.</p>
          <p><strong>Your request details:</strong></p>
          <ul>
            <li>Product: ${product}</li>
            <li>Quantity: ${quantity}</li>
            <li>Delivery Location: ${deliveryLocation}</li>
          </ul>
          <br>
          <p>Best regards,<br>Fruitika Sales Team</p>
        `
        })
      } else {
        console.log('Email configuration not found, skipping email sending')
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
    }    return NextResponse.json({ 
      success: true, 
      message: 'Quote request submitted successfully! We will send you a quote within 24 hours.',
      id: quote.id 
    })
  } catch (error) {
    console.error('Error submitting quote request:', error)
    
    // Enhanced error logging
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      })
    } else {
      console.error('Non-Error object:', typeof error, error)
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to submit quote request',
        details: error instanceof Error ? error.message : 'Unknown error',
        type: typeof error
      },
      { status: 500 }
    )
  }
}