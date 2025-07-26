import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import { config as configDotenv } from "dotenv";

configDotenv();

const app = express();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define schema inline
const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  text: String,
});

const Product = mongoose.model("Product", productSchema);

// Middleware
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
const publicPath = path.join(process.cwd(), "public");
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath);
}
app.use("/public", express.static(publicPath));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, publicPath),
  filename: (req, file, cb) => cb(null, "menu.json"),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/json") cb(null, true);
    else cb(new Error("Only JSON files are allowed!"));
  },
});

// 📤 Upload menu.json and store in MongoDB
app.post("/upload-menu", upload.single("menu"), async (req, res) => {
  const filePath = path.join(publicPath, "menu.json");

  try {
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (!Array.isArray(jsonData)) {
      return res.status(400).json({ success: false, message: "Invalid JSON format" });
    }

    await Product.deleteMany({});
    await Product.insertMany(jsonData);

    res.json({ success: true, message: "Menu uploaded and stored in DB successfully" });
  } catch (err) {
    console.error("❌ Error uploading menu:", err);
    res.status(500).json({ success: false, message: "Error uploading menu" });
  }
});

// 📥 Get menu data from MongoDB
app.get("/get-menu", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, data: products });
  } catch (err) {
    console.error("❌ Error fetching menu:", err);
    res.status(500).json({ success: false, message: "Error fetching menu from DB" });
  }
});

// 📧 Email Booking Route
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
    console.error("❌ Email error:", error);
    res.status(500).json({ success: false, message: "Something went wrong while sending email" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
