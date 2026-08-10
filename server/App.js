const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

/*
=====================================
MIDDLEWARE
=====================================
*/

app.use(cors());

app.use(express.json());

/*
=====================================
HEALTH CHECK
=====================================
*/

app.get("/", (req, res) => {
  res.json({
    message: "BookEasy API is running 🚀",
  });
});

/*
=====================================
PAYFAST CONFIG
=====================================
*/

app.get("/api/payment/config", (req, res) => {
  res.json({
    merchantId: "10000100",
    merchantKey: "46f0cd694581a",
    depositAmount: 100,
    currency: "ZAR",
    sandbox: true,
  });
});

/*
=====================================
CREATE PAYMENT
=====================================
*/

app.post("/api/payment/create", (req, res) => {
  const {
    customerName,
    email,
    service,
    bookingDate,
  } = req.body;

  const paymentData = {
    merchant_id: "10000100",
    merchant_key: "46f0cd694581a",

    amount: "100.00",

    item_name: `${service} Deposit`,

    name_first: customerName,

    email_address: email,

    return_url:
  "http://localhost:5174/payment-success",

cancel_url:
  "http://localhost:5174/payment-cancel",
    notify_url:
      "http://localhost:5000/api/payment/notify",

    custom_str1: service,
    custom_str2: bookingDate,
  };

  res.json({
    success: true,
    sandbox: true,
    message: "Deposit created",
    paymentData,
  });
});

/*
=====================================
PAYMENT NOTIFICATION
=====================================
*/

app.post("/api/payment/notify", (req, res) => {
  console.log("✅ PayFast notification received");

  console.log(req.body);

  res.status(200).send("OK");
});

/*
=====================================
PAYMENT SUCCESS
=====================================
*/

app.get("/api/payment/success", (req, res) => {
  res.json({
    success: true,
    message: "Payment completed successfully",
  });
});

/*
=====================================
PAYMENT CANCELLED
=====================================
*/

app.get("/api/payment/cancel", (req, res) => {
  res.json({
    success: false,
    message: "Payment cancelled",
  });
});

/*
=====================================
FUTURE FEATURES
=====================================

- Email notifications
- WhatsApp notifications
- Admin dashboard
- Google Maps
- Reminders
- Tutors
- Churches
- Schools
- Gyms

=====================================
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});