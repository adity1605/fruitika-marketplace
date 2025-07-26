import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import nodemailer from 'nodemailer'

export async function GET() {
  try {
    const quotes = await prisma.quote.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(quotes)
  } catch (error) {
    console.error('Error fetching quotes:', error)
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, product, quantity, deliveryLocation, message } = body

    if (!name || !email || !product || !quantity || !deliveryLocation) {
      return NextResponse.json(
        { error: 'Name, email, product, quantity, and delivery location are required' },
        { status: 400 }
      )
    }

    // Save to database
    const quote = await prisma.quote.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        product,
        quantity,
        destination: deliveryLocation,
        message: message || null
      }
    })

    // Send email notification
    try {
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
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Quote request submitted successfully! We will send you a quote within 24 hours.',
      id: quote.id 
    })
  } catch (error) {
    console.error('Error submitting quote request:', error)
    return NextResponse.json(
      { error: 'Failed to submit quote request' },
      { status: 500 }
    )
  }
}