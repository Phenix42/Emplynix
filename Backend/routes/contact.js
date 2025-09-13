// server/routes/contact.js
import express from 'express';
import nodemailer from 'nodemailer';
const router = express.Router();

router.post('/', async (req, res) => {
  const { firstName, lastName, email, phone, subject, message } = req.body;

  try {
    // Configure transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hr@emplynix.com',       // your Gmail
        pass: 'fmkl rfps rsvr dlla'           // generated app password (not your login password)
      }
    });

    // Email content
    const mailOptions = {
      from: email, // sender is the user's email
      to: 'hr@emplynix.com',
      replyTo: email, // receiving email (your admin inbox)
      subject: `Contact Form: ${subject}`,
      html: `
       <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 620px; margin: 0 auto; background-color: #f9fafb; padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);">
  <h2 style="color: #1d4ed8; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-top: 0; text-align: center;">
    📩 New Contact Form Submission
  </h2>

  <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0; margin-top: 20px;">
    <h3 style="color: #1f2937; margin-top: 0; margin-bottom: 15px;"> Contact Information</h3>
    <p style="margin: 6px 0;"><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
    <p style="margin: 6px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    <p style="margin: 6px 0;"><strong>Subject:</strong> ${subject}</p>
  </div>

  <div style="background-color: #f0f9ff; padding: 20px; border: 1px dashed #93c5fd; border-radius: 10px; margin-top: 20px;">
    <h3 style="color: #1e3a8a; margin-top: 0; margin-bottom: 10px;">Message</h3>
    <p style="line-height: 1.6; color: #374151; white-space: pre-line;">${message.replace(/\n/g, '<br>')}</p>
  </div>

  <div style="margin-top: 30px; text-align: center; color: #9ca3af; font-size: 12px;">
    <p>This email was sent from the <strong>Emplynix</strong> contact form.</p>
  </div>
</div>

      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Email failed to send.' });
  }
});

export default router;
