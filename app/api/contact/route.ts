import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Missing email configuration');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      debug: true
    });

    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('Transporter verification failed:', verifyError);
      return NextResponse.json(
        { message: 'Email service configuration error' },
        { status: 500 }
      );
    }

    let info = await transporter.sendMail({
      from: `"Diligent Insight Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `Contact Form: ${formData.subject || 'New Contact Message'}`,
      text: `Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Subject: ${formData.subject || 'Not provided'}
Message: ${formData.message || 'No message provided'}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${formData.name || 'Not provided'}</p>
        <p><strong>Email:</strong> ${formData.email || 'Not provided'}</p>        
        <p><strong>Subject:</strong> ${formData.subject || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message || 'No message provided'}</p>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to send email', 
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      },
      { status: 500 }
    );
  }
} 