import { useState } from "react";
import "./App.css";

import { db } from "./firebase";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    business: "",
    service: "",
    bookingDate: "",
    bookingTime: "",
  });

  const services = [
    "Barbershop",
    "Hair Salon",
    "Gym",
    "Doctor",
    "Dentist",
    "Tutor",
    "Massage",
    "Electrician",
    "Plumber",
    "Mechanic",
    "Cleaning",
    "Gardening",
    "Attorney",
  ];

  const businesses = [
    "ABC Salon",
    "Elite Barber",
    "Health Clinic",
    "Power Electric",
    "Quick Plumbing",
  ];

  const availableTimes = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.business ||
      !form.service ||
      !form.bookingDate ||
      !form.bookingTime
    ) {
      setMessage("Please complete every field.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "bookings"), {
        customerName: form.fullName,
        customerEmail: form.email,
        businessName: form.business,
        service: form.service,
        date: form.bookingDate,
        time: form.bookingTime,
        deposit: 100,
        paymentStatus: "Pending",
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      setMessage("Booking created successfully.");

      setForm({
        fullName: "",
        email: "",
        business: "",
        service: "",
        bookingDate: "",
        bookingTime: "",
      });

    } catch (err) {
      console.log(err);
      setMessage("Unable to save booking.");
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <div className="card">

        <h1>BookEasy</h1>

        <p className="subtitle">
          AI Powered Appointment Booking Platform
        </p>

        <form onSubmit={handleSubmit}>

          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <select
            name="business"
            value={form.business}
            onChange={handleChange}
          >
            <option value="">Choose Business</option>

            {businesses.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          <select
            name="service"
            value={form.service}
            onChange={handleChange}
          >
            <option value="">Choose Service</option>

            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <input
            type="date"
            name="bookingDate"
            value={form.bookingDate}
            onChange={handleChange}
          />

          <select
            name="bookingTime"
            value={form.bookingTime}
            onChange={handleChange}
          >
            <option value="">Choose Time</option>

            {availableTimes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <button disabled={loading}>
            {loading ? "Saving..." : "Book Appointment"}
          </button>

        </form>

        <br />

        <button>
          Pay R100 Deposit
        </button>

        <br />
        <br />

        {message && (
          <div className="success">
            {message}
          </div>
        )}

      </div>
    </div>
  );
}