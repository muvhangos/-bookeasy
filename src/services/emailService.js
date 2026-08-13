export async function sendBookingEmail(booking) {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!apiUrl) {
      throw new Error("VITE_API_URL is not configured.");
    }

    const response = await fetch(`${apiUrl}/api/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });

    if (!response.ok) {
      throw new Error(`Email request failed: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Booking email error:", err);

    return {
      success: false,
      message: "Booking email could not be sent.",
    };
  }
}