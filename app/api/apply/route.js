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
    const phone = formData.get('phone')?.toString() || ''
    const coverLetter = formData.get('coverLetter')?.toString() || ''
    const jobTitle = formData.get('jobTitle')?.toString() || ''
    const resumeFile = formData.get('resume')

    // basic validation
    if (!name || !email || !jobTitle) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
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

    const emailContent = {
      from: process.env.FROM_EMAIL || '"Maverick Technologies LLC" <careers@mavericktechnologiesllc.com>',
      to: [toEmail],
      replyTo: email,
      subject,
      html: htmlBody,
      text: `Name: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ''}\nPosition: ${jobTitle}\n\nCover Letter:\n${coverLetter}${resumeFile ? `\n\nResume attached: ${resumeFile.name}` : ''}`,
    }

    if (resumeFile && resumeFile.size > 0) {
      const bytes = await resumeFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      emailContent.attachments = [
        {
          filename: resumeFile.name,
          content: buffer.toString('base64'),
          contentType: resumeFile.type,
        }
      ]
    }

    // --- Send email to HR ---
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

    // --- 🆕 Send auto-reply to applicant ---
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || '"Maverick Technologies LLC" <careers@mavericktechnologiesllc.com>',
        to: [email],
        subject: `Thank you for applying to ${jobTitle}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #1e3a8a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { padding: 30px; background: #ffffff; }
              .footer { margin-top: 30px; text-align: center; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You for Applying!</h1>
              </div>
              <div class="content">
                <p>Dear ${name},</p>
                <p>Thank you for submitting your application for the <strong>${jobTitle}</strong> position at <strong>Maverick Technologies LLC</strong>.</p>
                <p>We have received your application and our hiring team will review it carefully.</p>
                <p><strong>What happens next?</strong></p>
                <ul>
                  <li>Our team will review your application within <strong>5-7 business days</strong></li>
                  <li>If your qualifications match our needs, we will contact you via email or phone to schedule an interview</li>
                  <li>If you don't hear from us within 2 weeks, please feel free to follow up</li>
                </ul>
                <p>We appreciate your interest in joining our team!</p>
                <p style="margin-top: 30px;">Best regards,<br><strong>The Maverick Technologies LLC Team</strong><br>Dallas, TX</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} Maverick Technologies LLC. All rights reserved.</p>
                <p style="font-size: 12px;">This is an automated confirmation. Please do not reply to this email.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
          Thank You for Applying!

          Dear ${name},

          Thank you for submitting your application for the ${jobTitle} position at Maverick Technologies LLC.

          We have received your application and our hiring team will review it carefully.

          What happens next?
          - Our team will review your application within 5-7 business days
          - If your qualifications match our needs, we will contact you via email or phone to schedule an interview
          - If you don't hear from us within 2 weeks, please feel free to follow up

          We appreciate your interest in joining our team!

          Best regards,
          The Maverick Technologies LLC Team
          Dallas, TX
        `,
      });
      
      console.log('Auto-reply sent to:', email);
    } catch (autoReplyErr) {
      // Don't fail the main request if auto-reply fails
      console.error('Auto-reply failed (but main email was sent):', autoReplyErr);
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
