import { useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";
import { db } from "../firebase";

import "./Pages.css";

// Components
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

const auth = getAuth();

export default function BookAppointment() {
  const [booking, setBooking] = useState({
    service: "",
    date: "",
    time: "",
  });

  const [message, setMessage] = useState("");

  function update(e) {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  }

  async function submit(e) {
    e.preventDefault();

    if (!auth.currentUser) {
      setMessage("Please login first.");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        userId: auth.currentUser.uid,
        service: booking.service,
        bookingDate: booking.date,
        bookingTime: booking.time,
        paymentStatus: "pending",
        appointmentStatus: "waiting",
        depositAmount: 100,
        createdAt: serverTimestamp(),
      });

      setMessage("✅ Appointment booked successfully.");

      setBooking({
        service: "",
        date: "",
        time: "",
      });
    } catch (err) {
      console.error(err);
      setMessage(err.message);
    }
  }

  return (
    <Card>
      <h2>📅 Book Appointment</h2>

      {message && <p>{message}</p>}

      <form onSubmit={submit}>
        <Input
          name="service"
          placeholder="Service"
          value={booking.service}
          onChange={update}
        />

        <Input
          name="date"
          type="date"
          value={booking.date}
          onChange={update}
        />

        <Input
          name="time"
          type="time"
          value={booking.time}
          onChange={update}
        />

        <Button type="submit">
          Book Appointment
        </Button>
      </form>
    </Card>
  );
}