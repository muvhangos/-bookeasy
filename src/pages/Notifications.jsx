import "./Pages.css";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Booking Confirmed",
      message: "Your appointment has been confirmed successfully.",
      date: "Today",
      type: "success",
    },
    {
      id: 2,
      title: "Payment Received",
      message: "Your R100 booking deposit has been received.",
      date: "Today",
      type: "payment",
    },
    {
      id: 3,
      title: "Reminder",
      message: "Your appointment is tomorrow at 10:00 AM.",
      date: "Tomorrow",
      type: "reminder",
    },
  ];

  return (
    <div className="dashboard">
      <h1>🔔 Notifications</h1>

      {notifications.length === 0 ? (
        <div className="bookingCard">
          <h2>No Notifications</h2>
          <p>You have no new notifications.</p>
        </div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className="bookingCard"
          >
            <h2>{notification.title}</h2>

            <p>{notification.message}</p>

            <p>
              <strong>Date:</strong> {notification.date}
            </p>

            <p>
              <strong>Type:</strong> {notification.type}
            </p>
          </div>
        ))
      )}
    </div>
  );
}