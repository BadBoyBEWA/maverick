import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Define TypeScript interface for the request body
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  marketingConsent: boolean;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as ContactFormData;
    const { name, email, phone, company, subject, message, marketingConsent } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Get recipient email from environment variable
    const toEmail = process.env.TO_EMAIL;
    if (!toEmail) {
      console.error('TO_EMAIL environment variable is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || '"Maverick\'s LLC" <contact@maverickllctexas.com>',
      to: [toEmail],
      replyTo: email,
      subject: `New Contact: ${subject} from ${name}`,
      html: `
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
            .consent-badge { 
              display: inline-block; 
              padding: 5px 10px; 
              border-radius: 20px; 
              font-size: 14px;
              background: ${marketingConsent ? '#10b981' : '#ef4444'}; 
              color: white; 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">📋 Name:</div>
                <div class="field-value">${name}</div>
              </div>
              <div class="field">
                <div class="field-label">📧 Email:</div>
                <div class="field-value">${email}</div>
              </div>
              ${phone ? `
              <div class="field">
                <div class="field-label">📞 Phone:</div>
                <div class="field-value">${phone}</div>
              </div>
              ` : ''}
              ${company ? `
              <div class="field">
                <div class="field-label">🏢 Company:</div>
                <div class="field-value">${company}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="field-label">📌 Subject:</div>
                <div class="field-value">${subject}</div>
              </div>
              <div class="field">
                <div class="field-label">💬 Message:</div>
                <div class="field-value">${message.replace(/\n/g, '<br>')}</div>
              </div>
              <div class="field">
                <div class="field-label">✅ Marketing Consent:</div>
                <div class="field-value">
                  <span class="consent-badge">${marketingConsent ? 'CONSENT GIVEN' : 'NO CONSENT'}</span>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        New Contact Form Submission
        ==========================
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Company: ${company || 'Not provided'}
        Subject: ${subject}
        
        Message:
        ${message}
        
        Marketing Consent: ${marketingConsent ? 'Yes' : 'No'}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    // Optional: Send auto-reply to customer
    if (email) {
      try {
        await resend.emails.send({
          from: process.env.FROM_EMAIL || '"Maverick\'s LLC" <contact@maverickllctexas.com>',
          to: [email],
          subject: 'Thank you for contacting Maverick\'s LLC',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #1e3a8a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { padding: 30px; background: #ffffff; }
                .button { 
                  display: inline-block; 
                  padding: 12px 24px; 
                  background: #1e3a8a; 
                  color: white; 
                  text-decoration: none; 
                  border-radius: 6px; 
                  margin-top: 20px; 
                }
                .footer { margin-top: 30px; text-align: center; color: #6b7280; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Thank You for Reaching Out!</h1>
                </div>
                <div class="content">
                  <p>Dear ${name},</p>
                  <p>Thank you for contacting <strong>Maverick's LLC</strong>. We have received your inquiry and our team will review it shortly.</p>
                  <p><strong>We typically respond within 24 hours during business days.</strong></p>
                  <p>In the meantime, you can:</p>
                  <ul>
                    <li>Browse our <a href="https://www.maverickllctexas.com/products">product catalog</a></li>
                    <li>Check out our <a href="https://www.maverickllctexas.com/services">custom fabrication services</a></li>
                  </ul>
                  <a href="https://www.maverickllctexas.com" class="button">Visit Our Website</a>
                  <p style="margin-top: 30px;">Best regards,<br>The Maverick's LLC Team<br>Dallas, TX</p>
                </div>
                <div class="footer">
                  <p>© ${new Date().getFullYear()} Maverick's LLC. All rights reserved.</p>
                </div>
              </div>
            </body>
            </html>
          `,
        });
      } catch (autoReplyError) {
        // Log but don't fail the main request if auto-reply fails
        console.error('Auto-reply failed:', autoReplyError);
      }
    }

    return NextResponse.json({ 
      success: true, 
      messageId: data?.id 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Type-safe error handling
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to send message. Please try again.';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}