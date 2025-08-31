const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/agenda`;
import axios from "axios";

// GET AGENDA (BOOKINGS/SESSIONS) - Grabs sessions for staff, and bookings for students
export const index = async () => {
  try {
    const res = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.data) {
      throw new Error("Error something went wrong fetching upcoming agenda");
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// UPDATE / CANCEL BOOKING STATUS
export const cancelBooking = async (bookingId) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/${bookingId}`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (!res.data) {
      throw new Error("Error something went wrong fetching upcoming agenda");
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
