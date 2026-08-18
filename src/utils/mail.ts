import nodemailer from 'nodemailer';

type SendMailInput = {
  to: string;
  subject: string;
  text: string;
};

export const sendMail = async ({ to, subject, text }: SendMailInput) => {
  if (!process.env.SMTP_HOST) {
    console.log(`[mail] to=${to}\n${subject}\n${text}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    text,
  });
};