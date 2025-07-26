import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        message
      }
    })

    // Send email notification
    try {
      console.log('Setting up email transporter...')
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      })

      console.log('Sending admin notification email...')
      // Email to admin (send to your own email for testing)
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to yourself for testing
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      })
      console.log('Admin email sent successfully')

      console.log('Sending confirmation email to user...')
      // Confirmation email to user
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting Fruitika',
        html: `
          <h2>Thank you for your inquiry!</h2>
          <p>Dear ${name},</p>
          <p>We have received your message and will get back to you within 24 hours.</p>
          <p><strong>Your message:</strong></p>
          <p>${message}</p>
          <br>
          <p>Best regards,<br>Fruitika Team</p>
        `
      })
      console.log('Confirmation email sent successfully')
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Continue even if email fails
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully! We will get back to you within 24 hours.',
      id: contact.id 
    })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}