import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { config as configDotenv } from "dotenv";
import { fileURLToPath } from "url";

// Load .env variables
configDotenv();

// Setup __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// CORS Configuration
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: false,
  optionsSuccessStatus: 200,
}));

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

// Paths
const publicPath = path.join(__dirname, "public");
const menuJsonPath = path.join(publicPath, "menu.json");

// Ensure public directory exists
await fs.mkdir(publicPath, { recursive: true });

// Serve static files
app.use("/public", express.static(publicPath));

// Multer setup for JSON menu upload
const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => cb(null, publicPath),
    filename: (_, __, cb) => cb(null, "menu.json"),
  }),
  fileFilter: (_, file, cb) => {
    file.mimetype === "application/json"
      ? cb(null, true)
      : cb(new Error("Only JSON files are allowed"));
  },
});

// ✅ Route: Upload Menu
app.post("/upload-menu", upload.single("menu"), async (req, res) => {
  try {
    console.log("📥 Uploaded file:", req.file?.path);

    const fileData = await fs.readFile(menuJsonPath, "utf-8");
    if (!fileData?.trim()) {
      return res.status(400).json({ success: false, message: "Uploaded file is empty." });
    }

    const jsonData = JSON.parse(fileData);

    if (!Array.isArray(jsonData.menu)) {
      return res.status(400).json({ success: false, message: "Invalid JSON: 'menu' array missing." });
    }

    console.log("✅ Menu uploaded and validated.");
    res.json({ success: true, message: "Menu uploaded successfully." });

  } catch (error) {
    console.error("❌ Upload error:", error.message);
    res.status(500).json({ success: false, message: "Server error during upload." });
  }
});

// ✅ Route: Get Menu
app.get("/get-menu", async (_, res) => {
  try {
    const fileData = await fs.readFile(menuJsonPath, "utf-8");
    const jsonData = JSON.parse(fileData);
    res.json({ success: true, data: jsonData.menu });
  } catch (error) {
    console.error("❌ Fetch menu error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch menu." });
  }
});

// ✅ Route: Send Booking Email
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

  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    res.status(500).json({ success: false, message: "Email sending failed." });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Lion's Den Café backend running at http://localhost:${PORT}`);
});
