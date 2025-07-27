import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Simple in-memory storage for contacts
interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  createdAt: string
}

// In-memory storage
let contacts: Contact[] = []

const createContact = (contactData: Omit<Contact, 'id' | 'createdAt'>) => {
  const newContact: Contact = {
    ...contactData,
    id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString()
  }
  contacts.push(newContact)
  return newContact
}

const getAllContacts = () => contacts

export async function POST(request: NextRequest) {
  try {
    console.log('Contact API: Request received')
    const body = await request.json()
    console.log('Contact API: Body parsed:', { name: body.name, email: body.email, hasMessage: !!body.message })
    
    const { name, email, phone, company, message } = body

    if (!name || !email || !message) {
      console.log('Contact API: Validation failed', { name: !!name, email: !!email, message: !!message })
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    console.log('Contact API: Creating contact in database...')
    // Save to database
    const contact = createContact({
      name,
      email,
      phone: phone || undefined,
      company: company || undefined,
      message
    })
    
    console.log('Contact API: Contact created successfully:', contact.id)

        // Send email notification (only if email config exists)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        console.log('Setting up email transporter...')
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        })

        console.log('Sending admin notification email...')
        // Email to admin
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
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
      } else {
        console.log('Email configuration not found, skipping email sending')
      }
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

// GET endpoint for admin to retrieve contacts
export async function GET() {
  try {
    const allContacts = getAllContacts()
    return NextResponse.json(allContacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}