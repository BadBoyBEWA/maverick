import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/mailjet'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, coverLetter, jobTitle } = body

    // Basic validation
    if (!name || !email || !jobTitle) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Compose email content (could also use a Mailjet template)
    const subject = `New application for ${jobTitle}`
    const text = `Name: ${name}\nEmail: ${email}\nJob: ${jobTitle}\n\nCover letter:\n${coverLetter || ''}`

    const result = await sendEmail({
      to: process.env.HR_EMAIL || process.env.FROM_EMAIL, // send to HR or yourself
      subject,
      text,
    })

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Application route error', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Server error' },
      { status: 500 }
    )
  }
}
