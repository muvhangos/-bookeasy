import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function CustomerDashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [bookings] = useState([
    {
      id: 1,
      service: "Barbershop",
      business: "Elite Barber",
      date: "2026-08-01",
      time: "10:00",
      status: "Confirmed",
    },
    {
      id: 2,
      service: "Massage",
      business: "Relax Spa",
      date: "2026-08-05",
      time: "15:00",
      status: "Pending",
    },
  ]);

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {

      if (!currentUser) {
        navigate("/customer/login");
      } else {
        setUser(currentUser);
      }

    });

    return unsubscribe;

  }, []);

  const logout = async () => {

    await signOut(auth);

    navigate("/");

  };

  return (

    <div className="dashboard">

      <div className="topBar">

        <div>

          <h1>Customer Dashboard</h1>

          <p>

            Welcome

            <strong>

              {" "}

              {user?.email}

            </strong>

          </p>

        </div>

        <button onClick={logout}>

          Logout

        </button>

      </div>

      <div className="dashboardCards">

        <div className="dashCard">

          <h2>📅 My Bookings</h2>

          <h1>{bookings.length}</h1>

        </div>

        <div className="dashCard">

          <h2>💳 Payments</h2>

          <h1>R100</h1>

        </div>

        <div className="dashCard">

          <h2>🤖 AI Assistant</h2>

          <p>Available</p>

        </div>

      </div>

      <div className="bookingList">

        <h2>Upcoming Appointments</h2>

        {bookings.map((booking) => (

          <div className="bookingCard" key={booking.id}>

            <h3>{booking.service}</h3>

            <p>Business: {booking.business}</p>

            <p>Date: {booking.date}</p>

            <p>Time: {booking.time}</p>

            <p>Status: {booking.status}</p>

          </div>

        ))}

      </div>

    </div>

  );

}