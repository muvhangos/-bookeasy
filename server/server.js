import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import OpenAI from "openai";

import { db } from "./firebaseAdmin.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT = process.env.PORT || 5000;

// =============================
// OpenAI Configuration
// =============================

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// =============================
// Email Configuration
// =============================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// =============================
// Home Route
// =============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    app: "BookEasy API",
    version: "2.0",
    status: "Running",
  });
});
// =============================
// Start Server
// =============================

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});