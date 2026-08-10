import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

// Home
import Home from "./pages/Home.jsx";

// Booking
import App from "./App.jsx";
import BookAppointment from "./pages/BookAppointment.jsx";

// AI
import AIAssistant from "./pages/AIAssistant.jsx";

// Customer
import CustomerLogin from "./pages/CustomerLogin.jsx";
import CustomerRegister from "./pages/CustomerRegister.jsx";
import CustomerDashboard from "./pages/CustomerDashboard.jsx";
import BookingHistory from "./pages/BookingHistory.jsx";

// Business
import BusinessLogin from "./pages/BusinessLogin.jsx";
import BusinessRegister from "./pages/BusinessRegister.jsx";
import BusinessDashboard from "./pages/BusinessDashboard.jsx";

// Notifications
import Notifications from "./pages/Notifications.jsx";

// Admin
import AdminDashboard from "./AdminDashboard.jsx";

// Payments
import PaymentSuccess from "./PaymentSuccess.jsx";
import PaymentCancel from "./PaymentCancel.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Booking */}
        <Route path="/book" element={<App />} />
        <Route path="/appointment" element={<BookAppointment />} />

        {/* AI Assistant */}
        <Route path="/ai" element={<AIAssistant />} />

        {/* Customer */}
        <Route
          path="/customer/login"
          element={<CustomerLogin />}
        />

        <Route
          path="/customer/register"
          element={<CustomerRegister />}
        />

        <Route
          path="/customer/dashboard"
          element={<CustomerDashboard />}
        />

        <Route
          path="/customer/history"
          element={<BookingHistory />}
        />

        {/* Business */}
        <Route
          path="/business/login"
          element={<BusinessLogin />}
        />

        <Route
          path="/business/register"
          element={<BusinessRegister />}
        />

        <Route
          path="/business/dashboard"
          element={<BusinessDashboard />}
        />

        {/* Notifications */}
        <Route
          path="/notifications"
          element={<Notifications />}
        />

        {/* Google Maps */}
        <Route
          path="/map"
          element={
            <iframe
              title="Google Maps"
              src="https://maps.google.com/maps?q=Johannesburg&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="700"
              style={{
                border: 0,
              }}
              loading="lazy"
            />
          }
        />

        {/* Secure Payments */}
        <Route
          path="/payment"
          element={<PaymentSuccess />}
        />

        <Route
          path="/payment-success"
          element={<PaymentSuccess />}
        />

        <Route
          path="/payment-cancel"
          element={<PaymentCancel />}
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);