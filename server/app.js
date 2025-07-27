import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { existsSync, writeFileSync } from "fs";
import { config as configDotenv } from "dotenv";
import { fileURLToPath } from "url";

// Load .env variables
configDotenv();

// Setup __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// ✅ CORS
app.use(cors({
  origin: "*", // Replace with your frontend domain in production
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

// ✅ Middleware
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Paths
const publicPath = path.join(__dirname, "public");
const menuJsonPath = path.join(publicPath, "menu.json");

// Ensure public folder exists
await fs.mkdir(publicPath, { recursive: true });

// Serve static files
app.use("/public", express.static(publicPath));

// ✅ Multer (memory storage for better platform compatibility)
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_, file, cb) => {
    if (file.mimetype === "application/json") cb(null, true);
    else cb(new Error("Only JSON files are allowed."));
  },
});

// ✅ Upload Menu JSON
app.post("/upload-menu", upload.single("menu"), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    const raw = req.file.buffer.toString("utf-8");
    if (!raw.trim()) {
      return res.status(400).json({ success: false, message: "Uploaded file is empty." });
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed.menu)) {
      return res.status(400).json({ success: false, message: "Invalid JSON format: expected 'menu' array." });
    }

    // Save to public/menu.json
    await fs.writeFile(menuJsonPath, JSON.stringify(parsed, null, 2));

    console.log("✅ Menu uploaded and saved.");
    res.json({ success: true, message: "Menu uploaded successfully." });

  } catch (err) {
    console.error("❌ Upload error:", err.message);
    res.status(500).json({ success: false, message: "Error uploading menu." });
  }
});

// ✅ Get Menu
app.get("/get-menu", async (_, res) => {
  try {
    if (!existsSync(menuJsonPath)) {
      return res.status(404).json({ success: false, message: "Menu file not found." });
    }

    const fileData = await fs.readFile(menuJsonPath, "utf-8");
    const jsonData = JSON.parse(fileData);

    if (!Array.isArray(jsonData.menu)) {
      return res.status(500).json({ success: false, message: "Invalid menu format." });
    }

    res.json({ success: true, data: jsonData.menu });

  } catch (err) {
    console.error("❌ Fetch menu error:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch menu." });
  }
});

// ✅ Send Booking Email
app.post("/send-email", async (req, res) => {
  const { name, email, phone, date, time, occasion, message } = req.body;

  if (!name || !email || !phone || !date || !time || !occasion || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
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
          <h2>🦁 New Booking - Lion's Den Café</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Occasion:</strong> ${occasion}</p>
          <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "✅ Email sent successfully." });

  } catch (err) {
    console.error("❌ Email error:", err.message);
    res.status(500).json({ success: false, message: "Email sending failed." });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Lion's Den Café backend running at http://localhost:${PORT}`);
});
