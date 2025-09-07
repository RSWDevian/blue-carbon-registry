import nodemailer from "nodemailer";

export async function sendProjectNumberEmail(email, projectNumber) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Project Number",
    text: `Thank you for registering. Your project number is: ${projectNumber}`,
  });
}