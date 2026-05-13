/**
 * Email Service (Placeholder)
 * Structure for sending transactional emails
 * Can be wired to Nodemailer, SendGrid, or Resend
 */

/**
 * Send an email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content
 */
export const sendEmail = async ({ to, subject, html }) => {
  // TODO: Implement with Nodemailer or preferred email service
  // Example with Nodemailer:
  //
  // import nodemailer from 'nodemailer';
  // const transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: process.env.SMTP_PORT,
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASS,
  //   },
  // });
  //
  // await transporter.sendMail({
  //   from: `"AgroCare AI" <${process.env.SMTP_USER}>`,
  //   to,
  //   subject,
  //   html,
  // });

  console.log(`📧 Email would be sent to: ${to} | Subject: ${subject}`);
};

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  await sendEmail({
    to: email,
    subject: 'AgroCare AI - Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">AgroCare AI</h2>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: #10b981; color: white; text-decoration: none; border-radius: 8px;">
          Reset Password
        </a>
        <p style="margin-top: 20px; color: #666;">This link expires in 15 minutes.</p>
        <p style="color: #666;">If you didn't request this, please ignore this email.</p>
      </div>
    `,
  });
};

/**
 * Send welcome email to new users
 */
export const sendWelcomeEmail = async (email, name) => {
  await sendEmail({
    to: email,
    subject: 'Welcome to AgroCare AI! 🌱',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Welcome to AgroCare AI, ${name}! 🌱</h2>
        <p>We're excited to have you on board. Start by scanning your first plant to detect diseases early.</p>
        <a href="${process.env.CLIENT_URL}/dashboard" style="display: inline-block; padding: 12px 24px; background: #10b981; color: white; text-decoration: none; border-radius: 8px;">
          Go to Dashboard
        </a>
      </div>
    `,
  });
};
