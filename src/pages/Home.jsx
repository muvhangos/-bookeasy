import { Link } from "react-router-dom";
import "./Pages.css";

export default function Home() {
  const cards = [
    {
      title: "🤖 AI Assistant",
      text: "Ask AI about bookings and services.",
      link: "/ai",
    },
    {
      title: "📅 Smart Booking",
      text: "Book appointments in seconds.",
      link: "/book",
    },
    {
      title: "💳 Secure Payments",
      text: "Pay deposits securely.",
      link: "/payment",
    },
    {
      title: "📱 WhatsApp",
      text: "Booking reminders via WhatsApp.",
      link: "/notifications",
    },
    {
      title: "📧 Email",
      text: "Receive booking confirmations.",
      link: "/notifications",
    },
    {
      title: "📍 Google Maps",
      text: "Navigate to your appointment.",
      link: "/map",
    },
    {
      title: "🏢 Business Dashboard",
      text: "Manage customers and bookings.",
      link: "/business/dashboard",
    },
    {
      title: "👑 Admin Dashboard",
      text: "Manage the entire platform.",
      link: "/admin",
    },
  ];

  return (
    <div className="home">
      <section className="hero">
        <h1 className="logo">✂️ BookEasy</h1>

        <h2>AI Powered Appointment Booking Platform</h2>

        <p className="subtitle">
          Book appointments with trusted service providers.
        </p>

        <div className="buttons">
          <Link to="/customer/login">
            <button className="primary">Customer Login</button>
          </Link>

          <Link to="/customer/register">
            <button>Customer Register</button>
          </Link>

          <Link to="/business/login">
            <button className="primary">Business Login</button>
          </Link>

          <Link to="/business/register">
            <button>Register Business</button>
          </Link>
        </div>
      </section>

      <section className="features">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="card">
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}