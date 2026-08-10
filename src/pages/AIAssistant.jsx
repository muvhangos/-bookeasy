import { useState } from "react";
import "./Pages.css";

export default function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "AI",
      text: "👋 Welcome to BookEasy AI Assistant! Ask me anything about bookings, payments, businesses, services or appointments."
    }
  ]);

  function getResponse(text) {
    const q = text.toLowerCase().trim();

    if (q.includes("hello") || q.includes("hi")) {
      return "👋 Hello! How can I help you today?";
    }

    if (q.includes("book")) {
      return "📅 To make a booking, open 'Book Appointment', choose a business, select a service, pick a date & time, then pay the R100 deposit.";
    }

    if (q.includes("deposit") || q.includes("price") || q.includes("cost")) {
      return "💳 Every booking requires a non-refundable R100 deposit.";
    }

    if (q.includes("pay")) {
      return "💳 Payments are processed securely through PayFast.";
    }

    if (q.includes("cancel")) {
      return "❌ You may cancel your booking before the appointment. Contact the business if payment has already been made.";
    }

    if (q.includes("reschedule") || q.includes("change")) {
      return "🔄 Open Booking History and choose Reschedule, or contact the business.";
    }

    if (q.includes("doctor")) {
      return "🩺 Please arrive at least 15 minutes before your doctor's appointment.";
    }

    if (q.includes("dentist")) {
      return "😁 Remember to brush your teeth before your dental appointment.";
    }

    if (q.includes("barber")) {
      return "💈 Weekdays are usually quieter than weekends.";
    }

    if (q.includes("salon") || q.includes("hair")) {
      return "✂️ Hair appointments normally take between 45 and 60 minutes.";
    }

    if (q.includes("massage")) {
      return "💆 Massage sessions normally last 60 minutes.";
    }

    if (q.includes("gym")) {
      return "🏋️ Morning gym sessions are usually less crowded.";
    }

    if (q.includes("electrician")) {
      return "⚡ Describe your electrical issue clearly when booking so the technician brings the correct equipment.";
    }

    if (q.includes("plumber")) {
      return "🚰 Include photos of the plumbing problem if possible to help the plumber prepare.";
    }

    if (q.includes("clean")) {
      return "🧹 Cleaning services can be booked as once-off or recurring visits.";
    }

    if (q.includes("mechanic")) {
      return "🚗 Please include your vehicle make and model when booking.";
    }

    if (q.includes("email")) {
      return "📧 You'll receive confirmation and reminder emails after your booking is accepted.";
    }

    if (q.includes("whatsapp")) {
      return "📱 WhatsApp confirmations and reminders are sent automatically.";
    }

    if (q.includes("map") || q.includes("location")) {
      return "📍 Open your booking and click 'Open Google Maps' for directions.";
    }

    if (q.includes("business")) {
      return "🏢 Businesses can manage bookings, accept/reject appointments, and track payments from the Business Dashboard.";
    }

    if (q.includes("admin")) {
      return "👑 Admin manages customers, businesses, bookings, reports and platform analytics.";
    }

    if (q.includes("service")) {
      return "⭐ BookEasy supports salons, barbers, doctors, tutors, plumbers, electricians, mechanics, gyms, churches and many more.";
    }

    if (q.includes("recommend")) {
      return "⭐ Morning appointments usually have the shortest waiting times.";
    }

    if (q.includes("thank")) {
      return "😊 You're welcome! Happy booking!";
    }

    return "🤖 I couldn't understand your question. Try asking about bookings, services, payments, WhatsApp, email, Google Maps or appointments.";
  }

  function sendMessage() {
    if (!question.trim()) return;

    const userMessage = {
      sender: "You",
      text: question
    };

    const aiMessage = {
      sender: "AI",
      text: getResponse(question)
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setQuestion("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  function clearChat() {
    setMessages([
      {
        sender: "AI",
        text: "👋 Chat cleared. How can I help you today?"
      }
    ]);
  }

  return (
    <div className="dashboard">

      <h1>🤖 BookEasy AI Assistant</h1>

      <div
        className="bookingCard"
        style={{
          height: "420px",
          overflowY: "auto",
          marginBottom: "20px"
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px"
            }}
          >
            <strong>{msg.sender}:</strong>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Ask anything..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      <div className="actions">

        <button onClick={sendMessage}>
          Send
        </button>

        <button onClick={clearChat}>
          Clear Chat
        </button>

      </div>

      <div className="bookingCard">

        <h3>💡 Try asking:</h3>

        <ul>
          <li>How do I make a booking?</li>
          <li>How much is the deposit?</li>
          <li>Can I reschedule?</li>
          <li>How do I pay?</li>
          <li>Tell me about barbers.</li>
          <li>Where is Google Maps?</li>
          <li>Do I receive WhatsApp messages?</li>
          <li>Will I receive email reminders?</li>
        </ul>

      </div>

    </div>
  );
}