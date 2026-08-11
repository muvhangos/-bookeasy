import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

import { db } from "./firebaseAdmin.js";

dotenv.config();

const app = express();

// =====================================
// CORS
// =====================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bookeasy-nine.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// =====================================
// BODY PARSERS
// =====================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================
// PORT
// =====================================

const PORT = process.env.PORT || 5000;

// =====================================
// BASIC HEALTH CHECK
// Render uses this endpoint
// =====================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    app: "BookEasy API",
    version: "2.0",
    status: "Running",
  });
});

// =====================================
// RENDER HEALTH CHECK
// =====================================

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BookEasy API is healthy",
  });
});

// =====================================
// API HEALTH CHECK
// =====================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BookEasy backend is healthy",
  });
});

// =====================================
// PAYFAST CONFIG
// IMPORTANT:
// Never expose the Merchant Key to frontend
// =====================================

app.get("/api/payment/config", (req, res) => {
  res.json({
    success: true,
    merchantId: process.env.PAYFAST_MERCHANT_ID,
    depositAmount: 100,
    currency: "ZAR",
    sandbox: true,
  });
});

// =====================================
// CREATE PAYFAST PAYMENT
// =====================================

app.post("/api/payment/create", (req, res) => {
  try {
    const {
      customerName,
      email,
      service,
      bookingDate,
    } = req.body;

    if (!customerName || !email || !service || !bookingDate) {
      return res.status(400).json({
        success: false,
        message:
          "customerName, email, service and bookingDate are required",
      });
    }

    const frontendUrl =
      process.env.FRONTEND_URL ||
      "https://bookeasy-nine.vercel.app";

    const backendUrl =
      process.env.BACKEND_URL ||
      "https://bookeasy-api-olsc.onrender.com";

    const paymentData = {
      merchant_id: process.env.PAYFAST_MERCHANT_ID,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY,

      amount: "100.00",

      item_name: `${service} Deposit`,

      name_first: customerName,

      email_address: email,

      return_url: `${frontendUrl}/payment-success`,

      cancel_url: `${frontendUrl}/payment-cancel`,

      notify_url: `${backendUrl}/api/payment/notify`,

      custom_str1: service,

      custom_str2: bookingDate,
    };

    res.json({
      success: true,
      sandbox: true,
      message: "Deposit created",
      paymentData,
    });
  } catch (error) {
    console.error("Payment creation error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create payment",
    });
  }
});

// =====================================
// COMPATIBILITY PAYMENT ROUTE
// Frontend may use:
// /api/payments/deposit
// =====================================

app.post("/api/payments/deposit", (req, res) => {
  try {
    const {
      customerName,
      email,
      service,
      bookingDate,
    } = req.body;

    if (!customerName || !email || !service || !bookingDate) {
      return res.status(400).json({
        success: false,
        message:
          "customerName, email, service and bookingDate are required",
      });
    }

    const frontendUrl =
      process.env.FRONTEND_URL ||
      "https://bookeasy-nine.vercel.app";

    const backendUrl =
      process.env.BACKEND_URL ||
      "https://bookeasy-api-olsc.onrender.com";

    const paymentData = {
      merchant_id: process.env.PAYFAST_MERCHANT_ID,

      merchant_key: process.env.PAYFAST_MERCHANT_KEY,

      amount: "100.00",

      item_name: `${service} Deposit`,

      name_first: customerName,

      email_address: email,

      return_url: `${frontendUrl}/payment-success`,

      cancel_url: `${frontendUrl}/payment-cancel`,

      notify_url: `${backendUrl}/api/payment/notify`,

      custom_str1: service,

      custom_str2: bookingDate,
    };

    res.json({
      success: true,
      sandbox: true,
      message: "Deposit created",
      paymentData,
    });
  } catch (error) {
    console.error("Payment deposit error:", error);

    res.status(500).json({
      success: false,
      message: "Payment creation failed",
    });
  }
});

// =====================================
// PAYFAST NOTIFICATION
// =====================================

app.post("/api/payment/notify", async (req, res) => {
  try {
    console.log("PayFast notification received");

    console.log(req.body);

    // PayFast notification handling can be
    // expanded later to verify the payment
    // and update Firestore.

    res.status(200).send("OK");
  } catch (error) {
    console.error("PayFast notification error:", error);

    res.status(500).send("ERROR");
  }
});

// =====================================
// PAYMENT SUCCESS
// =====================================

app.get("/api/payment/success", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Payment completed successfully",
  });
});

// =====================================
// PAYMENT CANCEL
// =====================================

app.get("/api/payment/cancel", (req, res) => {
  res.status(200).json({
    success: false,
    message: "Payment cancelled",
  });
});

// =====================================
// EMAIL TRANSPORTER
// =====================================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// =====================================
// EMAIL
// =====================================

app.post("/api/email", async (req, res) => {
  try {
    const { email, service } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: email,

      subject: "BookEasy Booking Confirmation",

      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>BookEasy Booking Confirmation</h2>

          <p>Your BookEasy booking has been confirmed.</p>

          <p>
            <strong>Service:</strong>
            ${service || "BookEasy service"}
          </p>

          <p>
            Thank you for using BookEasy.
          </p>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email error:", error);

    res.status(500).json({
      success: false,
      message: "Email could not be sent",
    });
  }
});

// =====================================
// WHATSAPP
// =====================================

app.post("/api/whatsapp", async (req, res) => {
  try {
    console.log("WhatsApp notification:", req.body);

    res.status(200).json({
      success: true,
      message: "WhatsApp notification queued.",
    });
  } catch (error) {
    console.error("WhatsApp error:", error);

    res.status(500).json({
      success: false,
      message: "WhatsApp notification failed",
    });
  }
});

// =====================================
// 404 HANDLER
// =====================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// =====================================
// ERROR HANDLER
// =====================================

app.use((error, req, res, next) => {
  console.error("Server error:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// =====================================
// START SERVER
// =====================================

app.listen(PORT, () => {
  console.log(`BookEasy API running on port ${PORT}`);
});