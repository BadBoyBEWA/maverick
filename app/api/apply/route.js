import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// initialize Resend only when an API key is available
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function POST(request) {
  try {
    // expect multipart/form-data from the client
    const formData = await request.formData()
    const name = formData.get('name')?.toString() || ''
    const email = formData.get('email')?.toString() || ''
    const phone = formData.get('phone')?.toString() || '' // Add phone number
    const coverLetter = formData.get('coverLetter')?.toString() || ''
    const jobTitle = formData.get('jobTitle')?.toString() || ''
    const resumeFile = formData.get('resume') // Get the file from form data

    // basic validation - phone is optional, so only validate name, email, jobTitle
    if (!name || !email || !jobTitle) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // ensure we have an API key before doing anything networky
    if (!process.env.RESEND_API_KEY || !resend) {
      console.error('Resend API key is not configured')
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const toEmail = process.env.HR_EMAIL || 'support@maverickllctexas.com'

    const subject = `New application for ${jobTitle}`

    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1e3a8a; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 30px; border-radius: 8px; }
          .field { margin-bottom: 20px; }
          .field-label { font-weight: bold; color: #1e3a8a; }
          .field-value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
          .attachment-info { margin-top: 20px; padding: 15px; background: #e6f3ff; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Job Application</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Name:</div>
              <div class="field-value">${name}</div>
            </div>
            <div class="field">
              <div class="field-label">Email:</div>
              <div class="field-value">${email}</div>
            </div>
            ${phone ? `
            <div class="field">
              <div class="field-label">Phone Number:</div>
              <div class="field-value">${phone}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="field-label">Position:</div>
              <div class="field-value">${jobTitle}</div>
            </div>
            <div class="field">
              <div class="field-label">Cover Letter:</div>
              <div class="field-value">${coverLetter.replace(/\n/g, '<br>')}</div>
            </div>
            ${resumeFile ? `
            <div class="attachment-info">
              <strong>Resume/CV attached:</strong> ${resumeFile.name}
            </div>
            ` : ''}
          </div>
        </div>
      </body>
      </html>
    `

    // Prepare email content
    const emailContent = {
      from: process.env.FROM_EMAIL || '"Maverick\'s LLC" <contact@maverickllctexas.com>',
      to: [toEmail],
      replyTo: email,
      subject,
      html: htmlBody,
      text: `Name: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ''}\nPosition: ${jobTitle}\n\nCover Letter:\n${coverLetter}${resumeFile ? `\n\nResume attached: ${resumeFile.name}` : ''}`,
    }

    // Add attachment if file exists
    if (resumeFile && resumeFile.size > 0) {
      // Convert file to buffer
      const bytes = await resumeFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      // Add attachment to email
      emailContent.attachments = [
        {
          filename: resumeFile.name,
          content: buffer.toString('base64'),
          contentType: resumeFile.type,
        }
      ]
    }

    let sendResponse
    try {
      sendResponse = await resend.emails.send(emailContent)
    } catch (sendErr) {
      console.error('Resend request failed (apply):', sendErr)
      return NextResponse.json(
        { success: false, error: 'Email service request failed' },
        { status: 502 }
      )
    }

    const { data, error } = sendResponse || {}
    if (error) {
      console.error('Resend error (apply):', error)
      return NextResponse.json(
        { success: false, error: 'Failed to send application email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      messageId: data?.id,
      fileName: resumeFile?.name || null 
    })
  } catch (err) {
    console.error('Application route error:', err)
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Server error' },
      { status: 500 }
    )
  }
}