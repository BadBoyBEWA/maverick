// app/api/contact/route.js
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailjet';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Map subject values to readable labels
    const subjectMap = {
      quote: 'Request a Quote',
      product: 'Product Inquiry',
      custom: 'Custom Fabrication',
      support: 'Customer Support',
      partnership: 'Partnership Opportunity',
      other: 'Other'
    };

    const subjectLabel = subjectMap[subject] || subject;

    // Build contact info section conditionally
    const contactInfo = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      <p><strong>Inquiry Type:</strong> ${subjectLabel}</p>
    `;

    const contactInfoText = `
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ''}${company ? `Company: ${company}\n` : ''}Inquiry Type: ${subjectLabel}
    `;

    // Send notification email to yourself
    const result = await sendEmail({
      to: process.env.FROM_EMAIL,
      toName: 'Admin',
      subject: `New Contact: ${subjectLabel} from ${name}`,
      text: `
New Contact Form Submission

${contactInfoText}
Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #555;">Contact Details:</h3>
            ${contactInfo}
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555;">Message:</h3>
            <p style="background: #fff; padding: 15px; border-left: 4px solid #007bff; font-style: italic;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
        </div>
      `
    });

    // Send auto-reply to the user (only if first email succeeded)
    if (result.success) {
      await sendEmail({
        to: email,
        toName: name,
        subject: `Thank you for contacting us - ${process.env.FROM_NAME || 'Our Team'}`,
        text: `
Hi ${name},

Thank you for reaching out to us. We have received your ${subjectLabel.toLowerCase()} inquiry and will get back to you within 24 hours.

Here's a copy of your message for reference:
"${message}"

Best regards,
${process.env.FROM_NAME || 'The Team'}
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Thank you for contacting us!</h2>
            
            <p>Hi ${name},</p>
            
            <p>Thank you for reaching out to us. We have received your <strong>${subjectLabel.toLowerCase()}</strong> inquiry and will get back to you within 24 hours.</p>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #555;">Your message:</h3>
              <p style="font-style: italic; margin-bottom: 0;">
                "${message}"
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            
            <p style="color: #666; font-size: 14px;">
              Best regards,<br>
              <strong>${process.env.FROM_NAME || 'The Team'}</strong>
            </p>
          </div>
        `
      });
    }

    if (result.success) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Email sent successfully',
          name: name // Send name back for personalizing success message
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}