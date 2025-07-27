import { NextRequest, NextResponse } from 'next/server'
import { simpleDB } from '../../../lib/simpleDB'
import nodemailer from 'nodemailer'

export async function GET() {
  try {
    const careers = simpleDB.careers.getAll()
    return NextResponse.json(careers)
  } catch (error) {
    console.error('Error fetching careers:', error)
    return NextResponse.json({ error: 'Failed to fetch careers' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const position = formData.get('position') as string
    const experience = formData.get('experience') as string
    const location = formData.get('location') as string
    const coverLetter = formData.get('coverLetter') as string
    const resume = formData.get('resume') as File

    if (!name || !email || !position || !experience) {
      return NextResponse.json(
        { error: 'Name, email, position, and experience are required' },
        { status: 400 }
      )
    }

    // Convert resume to base64 for email attachment
    let resumeBase64 = ''
    let resumeName = ''
    if (resume && resume.size > 0) {
      const bytes = await resume.arrayBuffer()
      resumeBase64 = Buffer.from(bytes).toString('base64')
      resumeName = resume.name
    }

    // Save to simpleDB  
    const career = simpleDB.careers.create({
      name,
      email,
      phone: phone || undefined,
      position,
      experience,
      location: location || undefined,
      coverLetter: coverLetter || undefined,
      resumeUrl: resumeName || undefined
    })

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

      const attachments = []
      if (resumeBase64 && resumeName) {
        attachments.push({
          filename: resumeName,
          content: resumeBase64,
          encoding: 'base64'
        })
      }

      // Email to admin
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Job Application: ${position} - ${name}`,
        html: `
          <h2>New Job Application</h2>
          <p><strong>Position:</strong> ${position}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Experience:</strong> ${experience}</p>
          <p><strong>Location:</strong> ${location || 'Not provided'}</p>
          <p><strong>Cover Letter:</strong></p>
          <p>${coverLetter || 'None provided'}</p>
          ${resumeName ? `<p><strong>Resume:</strong> ${resumeName} (attached)</p>` : '<p><strong>Resume:</strong> Not provided</p>'}
        `,
        attachments
      })

      // Confirmation email to applicant
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Application Received - Fruitika Careers',
        html: `
          <h2>Thank you for your application!</h2>
          <p>Dear ${name},</p>
          <p>We have received your application for the <strong>${position}</strong> position.</p>
          <p>Our HR team will review your application and get back to you within 5-7 business days.</p>
          <p><strong>Application Details:</strong></p>
          <ul>
            <li>Position: ${position}</li>
            <li>Experience: ${experience}</li>
            <li>Resume: ${resumeName ? 'Attached' : 'Not provided'}</li>
          </ul>
          <br>
          <p>Best regards,<br>Fruitika HR Team</p>
        `
        })
      } else {
        console.log('Email configuration not found, skipping email sending')
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
    }    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully! We will review your application and get back to you soon.',
      id: career.id 
    })
  } catch (error) {
    console.error('Error submitting application:', error)
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}