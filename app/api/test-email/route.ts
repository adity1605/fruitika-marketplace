import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function GET() {
  try {
    console.log('Testing email configuration...')
    console.log('EMAIL_USER:', process.env.EMAIL_USER)
    console.log('EMAIL_PASS length:', process.env.EMAIL_PASS?.length)

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    // Verify connection
    await transporter.verify()
    console.log('SMTP connection verified successfully')

    // Send test email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Test Email from Fruitika',
      html: '<h1>Test Email</h1><p>If you receive this, email is working!</p>'
    })

    console.log('Test email sent:', info.messageId)

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      messageId: info.messageId
    })
  } catch (error) {
    console.error('Email test failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}