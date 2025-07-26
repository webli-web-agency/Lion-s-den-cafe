// app.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

// Route
app.post("/send-email", async (req, res) => {
  const { name, email, phone, date, time, occasion, message } = req.body;

  if (!name || !email || !phone || !date || !time || !occasion || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.RECEIVER_EMAIL,
    subject: `New Booking from ${name} | ${occasion}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; background: #f4f4f4; border-radius: 10px;">
        <h2>New Booking Request 🎉</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Occasion:</strong> ${occasion}</p>
        <p><strong>Message:</strong><br/> ${message.replace(/\n/g, "<br>")}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Booking email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Something went wrong while sending email" });
  }
});

export default app;
