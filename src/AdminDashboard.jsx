import { useNavigate } from "react-router-dom";
import "./Pages.css";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const businesses = [
    {
      id: 1,
      name: "Elite Barber",
      owner: "John Smith",
      status: "Pending",
    },
    {
      id: 2,
      name: "Relax Spa",
      owner: "Sarah Jones",
      status: "Approved",
    },
    {
      id: 3,
      name: "Fit Gym",
      owner: "David Brown",
      status: "Pending",
    },
  ];

  return (

    <div className="dashboard">

      <div className="topBar">

        <div>

          <h1>Admin Dashboard</h1>

          <p>BookEasy Management Console</p>

        </div>

        <button onClick={() => navigate("/")}>
          Logout
        </button>

      </div>

      <div className="dashboardCards">

        <div className="dashCard">
          <h3>👥 Customers</h3>
          <h1>1,250</h1>
        </div>

        <div className="dashCard">
          <h3>🏢 Businesses</h3>
          <h1>310</h1>
        </div>

        <div className="dashCard">
          <h3>📅 Bookings</h3>
          <h1>5,820</h1>
        </div>

        <div className="dashCard">
          <h3>💰 Revenue</h3>
          <h1>R185,300</h1>
        </div>

      </div>

      <div className="bookingCard">

        <h2>Pending Business Approvals</h2>

        {businesses.map((business) => (

          <div
            key={business.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
              paddingBottom: 20,
              borderBottom: "1px solid #ddd",
            }}
          >

            <div>

              <h3>{business.name}</h3>

              <p>Owner: {business.owner}</p>

              <strong>{business.status}</strong>

            </div>

            <div>

              <button
                style={{
                  background: "#22c55e",
                  color: "#fff",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: 8,
                  marginRight: 10,
                  cursor: "pointer",
                }}
              >
                Approve
              </button>

              <button
                style={{
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Reject
              </button>

            </div>

          </div>

        ))}

      </div>

      <div className="dashboardCards" style={{ marginTop: 30 }}>

        <div className="dashCard">

          <h3>🤖 AI Admin Assistant</h3>

          <p>
            Detect suspicious bookings, recommend business approvals,
            monitor trends and generate reports.
          </p>

        </div>

        <div className="dashCard">

          <h3>📈 Platform Analytics</h3>

          <ul>

            <li>✔ 96% Booking Success</li>

            <li>✔ 1,250 Active Customers</li>

            <li>✔ 310 Active Businesses</li>

            <li>✔ R185,300 Monthly Revenue</li>

          </ul>

        </div>

      </div>

    </div>

  );

}