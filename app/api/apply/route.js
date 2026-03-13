import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    // expect multipart/form-data from the client
    const formData = await request.formData()
    const name = formData.get('name')?.toString() || ''
    const email = formData.get('email')?.toString() || ''
    const coverLetter = formData.get('coverLetter')?.toString() || ''
    const jobTitle = formData.get('jobTitle')?.toString() || ''

    // basic validation
    if (!name || !email || !jobTitle) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // ensure we have an API key before doing anything networky
    if (!process.env.RESEND_API_KEY) {
      console.error('Resend API key is not configured')
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const resume = formData.get('resume')
    if (resume) {
      if (typeof resume === 'object' && typeof resume.arrayBuffer === 'function') {
        try {
          const buffer = await resume.arrayBuffer()
          const base64 = Buffer.from(buffer).toString('base64')
          if (base64 && base64.length > 0 && resume.name) {
            attachments.push({
              name: resume.name,
              content: base64, // Resend expects `content` (base64 string)
            })
          }
        } catch (fileErr) {
          console.error('Error reading resume file from formData:', fileErr)
        }
      }
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
            <div class="field">
              <div class="field-label">Position:</div>
              <div class="field-value">${jobTitle}</div>
            </div>
            <div class="field">
              <div class="field-label">Cover Letter:</div>
              <div class="field-value">${coverLetter.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    let sendResponse
    try {
      sendResponse = await resend.emails.send({
        from: process.env.FROM_EMAIL || '"Maverick\'s LLC" <contact@maverickllctexas.com>',
        to: [toEmail],
        replyTo: email,
        subject,
        html: htmlBody,
        text: `Name: ${name}\nEmail: ${email}\nPosition: ${jobTitle}\n\nCover Letter:\n${coverLetter}`,
        attachments: attachments.length ? attachments : undefined,
      })
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

    return NextResponse.json({ success: true, messageId: data?.id })
  } catch (err) {
    console.error('Application route error:', err)
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Server error' },
      { status: 500 }
    )
  }
}
