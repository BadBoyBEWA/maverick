// lib/mailjet.js
// NOTE: This helper was used previously for sending emails via Mailjet.
// The project has since migrated to Resend for deliverability. The file
// is retained for reference but is no longer imported by any API route.

import Mailjet from 'node-mailjet';

// Initialize Mailjet with your API credentials if available
let mailjet
if (process.env.MJ_APIKEY_PUBLIC && process.env.MJ_APIKEY_PRIVATE) {
  mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE
  })
} else {
  // during build (or if env vars not set) we avoid instantiating
  console.warn("Mailjet API keys are not set. Email functionality will be disabled.")
}

/**
 * Send an email using Mailjet
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.toName - Recipient name (optional)
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text version
 * @param {string} options.html - HTML version
 * @param {string} options.templateId - Mailjet template ID (optional)
 * @param {Object} options.variables - Template variables (optional)
 * @returns {Promise<Object>} - Result object with success status
 */
export async function sendEmail({ 
  to, 
  toName = '', 
  subject, 
  text, 
  html,
  templateId,
  variables = {}
}) {
  // if mailjet is not initialized, return a helpful error rather than crash
  if (!mailjet) {
    return {
      success: false,
      error: 'Mailjet is not configured. Set MJ_APIKEY_PUBLIC and MJ_APIKEY_PRIVATE in your environment.'
    };
  }

  // Validate required fields
  if (!to || !subject || (!text && !html && !templateId)) {
    return {
      success: false,
      error: 'Missing required email fields'
    };
  }

  // Prepare the message
  const message = {
    From: {
      Email: process.env.FROM_EMAIL,
      Name: process.env.FROM_NAME || 'Website Contact'
    },
    To: [
      {
        Email: to,
        Name: toName || to.split('@')[0] // Fallback to email username if no name
      }
    ],
    Subject: subject
  };

  // Add content based on what's provided
  if (templateId) {
    // Using a Mailjet template
    message.TemplateID = parseInt(templateId);
    message.TemplateLanguage = true;
    message.Variables = variables;
  } else {
    // Using direct content
    if (text) message.TextPart = text;
    if (html) message.HTMLPart = html;
  }

  try {
    const request = await mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [message]
      });

    // Check if the email was sent successfully
    const response = request.body;
    const messageStatus = response.Messages?.[0]?.Status;

    if (messageStatus === 'success') {
      return {
        success: true,
        message: 'Email sent successfully',
        data: response
      };
    } else {
      return {
        success: false,
        error: 'Email failed to send',
        data: response
      };
    }

  } catch (error) {
    // Handle different types of errors
    console.error('Mailjet Error Details:', {
      message: error.message,
      statusCode: error.statusCode,
      response: error.response?.body
    });

    let errorMessage = 'Failed to send email';
    
    if (error.statusCode === 401) {
      errorMessage = 'Authentication failed. Please check your Mailjet API keys.';
    } else if (error.statusCode === 400) {
      errorMessage = 'Invalid email request. Please check your email content.';
    } else if (error.statusCode === 429) {
      errorMessage = 'Too many requests. Please try again later.';
    }

    return {
      success: false,
      error: errorMessage,
      statusCode: error.statusCode,
      details: error.response?.body || error.message
    };
  }
}

/**
 * Verify Mailjet connection and credentials
 * @returns {Promise<Object>} - Connection status
 */
export async function testConnection() {
  if (!mailjet) {
    return {
      success: false,
      error: 'Mailjet is not configured. Set MJ_APIKEY_PUBLIC and MJ_APIKEY_PRIVATE in your environment.'
    };
  }

  try {
    // Try to fetch account info to verify credentials
    const response = await mailjet
      .get('user', { version: 'v3' })
      .request();

    return {
      success: true,
      message: 'Mailjet connection successful',
      data: response.body
    };
  } catch (error) {
    return {
      success: false,
      error: 'Mailjet connection failed',
      details: error.message
    };
  }
}

/**
 * Get a list of all templates (useful for debugging)
 * @returns {Promise<Array>} - List of templates
 */
export async function getTemplates() {
  try {
    const response = await mailjet
      .get('template', { version: 'v3' })
      .request();

    return {
      success: true,
      templates: response.body.Data
    };
  } catch (error) {
    console.error('Failed to fetch templates:', error);
    return {
      success: false,
      error: error.message
    };
  }
}