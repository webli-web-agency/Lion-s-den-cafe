// app.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";

configDotenv();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use("/public", express.static(path.join(process.cwd(), "public")));

// Ensure public directory exists
const publicPath = path.join(process.cwd(), "public");
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath);
}

// Multer setup for JSON file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, publicPath); // Save in /public
  },
  filename: function (req, file, cb) {
    cb(null, "menu.json"); // Always save as menu.json
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "application/json") {
      cb(null, true);
    } else {
      cb(new Error("Only JSON files are allowed!"));
    }
  },
});

// 📤 Upload menu.json route
app.post("/upload-menu", upload.single("menu"), (req, res) => {
  res.json({ success: true, message: "Menu uploaded successfully" });
});

// 📥 Fetch menu.json route
app.get("/get-menu", (req, res) => {
  const filePath = path.join(publicPath, "menu.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(404).json({ success: false, message: "Menu file not found" });
    }
    try {
      const menu = JSON.parse(data);
      res.json({ success: true, data: menu });
    } catch (parseErr) {
      res.status(500).json({ success: false, message: "Invalid JSON format" });
    }
  });
});

// 📧 Email Route (UNCHANGED)
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
