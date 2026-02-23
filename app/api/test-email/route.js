// app/api/test-mailjet/route.js
import { NextResponse } from 'next/server';
import { testConnection, sendEmail } from '@/lib/mailjet';

export async function GET() {
  try {
    // First test the connection
    const connectionTest = await testConnection();
    
    if (!connectionTest.success) {
      return NextResponse.json({
        success: false,
        error: 'Connection failed',
        details: connectionTest
      }, { status: 500 });
    }

    // Try to send a test email
    const testResult = await sendEmail({
      to: process.env.FROM_EMAIL, // Send to yourself
      subject: 'Mailjet Test Email',
      text: 'If you receive this, your Mailjet integration is working perfectly!',
      html: '<h1>Success!</h1><p>Your Mailjet integration is working perfectly.</p>'
    });

    return NextResponse.json({
      success: testResult.success,
      message: 'Test email sent',
      connection: 'OK',
      result: testResult
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}