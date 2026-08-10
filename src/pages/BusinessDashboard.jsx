import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase";
import "./Pages.css";

export default function BusinessDashboard() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // NEW
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  async function loadBookings() {
    try {

      const snapshot = await getDocs(collection(db, "bookings"));

      const data = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));

      setBookings(data);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function updateStatus(id, status) {
    try {

      await updateDoc(doc(db, "bookings", id), {
        status,
      });

      loadBookings();

    } catch (err) {
      console.log(err);
    }
  }

  async function removeBooking(id) {

    if (!window.confirm("Delete booking?")) return;

    await deleteDoc(doc(db, "bookings", id));

    loadBookings();
  }

  const pending = bookings.filter(
    (b) => b.status === "Pending"
  ).length;

  const completed = bookings.filter(
    (b) => b.status === "Completed"
  ).length;

  // NEW
  const filteredBookings = bookings.filter((booking) => {

    const matchesSearch =
      booking.customerName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      booking.service
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      booking.status === statusFilter;

    return matchesSearch && matchesStatus;

  });

  const totalRevenue = bookings
    .filter((b) => b.status === "Completed")
    .reduce(
      (sum, booking) => sum + (booking.deposit || 100),
      0
    );

  return (

    <div className="dashboard">

      <div className="topBar">
        <h1>Business Dashboard</h1>
      </div>

      <div className="stats">

        <div className="dashCard">
          <h3>Total Bookings</h3>
          <h1>{bookings.length}</h1>
        </div>

        <div className="dashCard">
          <h3>Pending</h3>
          <h1>{pending}</h1>
        </div>

        <div className="dashCard">
          <h3>Completed</h3>
          <h1>{completed}</h1>
        </div>

        <div className="dashCard">
          <h3>Total Revenue</h3>
          <h1>R {totalRevenue}</h1>
        </div>

      </div>

      <div className="searchBar">

        <input
          type="text"
          placeholder="Search customer or service..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option>All</option>
          <option>Pending</option>
          <option>Accepted</option>
          <option>Completed</option>
          <option>Rejected</option>
        </select>

      </div>

      {loading ? (

        <h3>Loading...</h3>

      ) : filteredBookings.length === 0 ? (

        <h3>No bookings found.</h3>

      ) : (

        filteredBookings.map((booking) => (

          <div
            key={booking.id}
            className="bookingCard"
          >

            <h3>{booking.customerName}</h3>

            <p>
              <strong>Email:</strong>{" "}
              {booking.customerEmail}
            </p>

            <p>
              <strong>Business:</strong>{" "}
              {booking.businessName}
            </p>

            <p>
              <strong>Service:</strong>{" "}
              {booking.service}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {booking.date}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {booking.time}
            </p>

            <p>
              <strong>Deposit:</strong> R100
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {booking.status}
            </p>

            <div className="actions">

              <button
                onClick={() =>
                  updateStatus(
                    booking.id,
                    "Accepted"
                  )
                }
              >
                Accept
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    booking.id,
                    "Rejected"
                  )
                }
              >
                Reject
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    booking.id,
                    "Completed"
                  )
                }
              >
                Complete
              </button>

              <button
                onClick={() =>
                  removeBooking(booking.id)
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))

      )}

    </div>

  );
}