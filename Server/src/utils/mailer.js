import nodemailer from 'nodemailer';
import {config}  from '../config/config.js';
 
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true, // ✅ REQUIRED for port 465
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS
  }
});

export const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"Urs Skill" <${config.SMTP_USER}>`,
    to,
    subject,
    html
  });
};
