import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { config as configDotenv } from "dotenv";

configDotenv();
const app = express();

// ✅ CORS Setup
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: false,
  sameSite: 'none',
  optionsSuccessStatus: 200,
}));

// ✅ Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Public folder
const publicPath = path.join(process.cwd(), "public");
const menuJsonPath = path.join(publicPath, "menu.json");

await fs.mkdir(publicPath, { recursive: true });
app.use("/public", express.static(publicPath));

// ✅ Multer Setup
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, publicPath),
    filename: (req, file, cb) => cb(null, "menu.json"),
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/json") cb(null, true);
    else cb(new Error("Only JSON files are allowed"));
  },
});

// ✅ Upload Route
app.post("/upload-menu", upload.single("menu"), async (req, res) => {
  try {
    console.log("📥 File uploaded to Public using multer:", req.file.path);

    const fileData = await fs.readFile(menuJsonPath, "utf-8");
    if (!fileData) {
      console.error("❌ Uploaded file is empty.");
      return res.status(400).json({ success: false, message: "Uploaded file is empty." });
    }

    const jsonData = JSON.parse(fileData);
    if (!jsonData.menu || !Array.isArray(jsonData.menu)) {
      console.error("❌ Invalid JSON structure: expected 'menu' array.");
      return res.status(400).json({ success: false, message: "Invalid JSON structure: expected 'menu' array." });
    }

    console.log("✅ Menu file validated and saved.");
    res.json({ success: true, message: "Menu uploaded successfully." });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ success: false, message: "Server error during upload." });
  }
});

// ✅ Get Menu
app.get("/get-menu", async (req, res) => {
  try {
    const fileData = await fs.readFile(menuJsonPath, "utf-8");
    const jsonData = JSON.parse(fileData);
    res.json({ success: true, data: jsonData.menu });
  } catch (err) {
    console.error("❌ Error fetching menu:", err);
    res.status(500).json({ success: false, message: "Failed to fetch menu." });
  }
});

// ✅ Booking Email
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
    subject: `New Booking: ${occasion}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #333;">🦁 New Booking Request - Lion's Den Café</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Occasion:</strong> ${occasion}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "✅ Email sent successfully." });
  } catch (err) {
    console.error("❌ Email error:", err);
    res.status(500).json({ success: false, message: "Email sending failed." });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Lion's Den Café server running at http://localhost:${PORT}`));
