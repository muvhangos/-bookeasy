import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import {
  getAuth,
} from "firebase/auth";

import { db } from "../firebase";
import Card from "../components/Card";

const auth = getAuth();

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      const snapshot = await getDocs(collection(db, "bookings"));

      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (booking) =>
            booking.userId === auth.currentUser?.uid
        );

      setBookings(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card title="📖 Booking History">
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking.id}
            className="bookingCard"
          >
            <h3>{booking.service}</h3>

            <p>
              <strong>Date:</strong>{" "}
              {booking.bookingDate}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {booking.bookingTime}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {booking.paymentStatus}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {booking.appointmentStatus}
            </p>

            <p>
              <strong>Deposit:</strong> R100
            </p>
          </div>
        ))
      )}
    </Card>
  );
}