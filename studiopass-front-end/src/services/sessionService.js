import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/classes`;

// GET ALL SESSIONS
export const index = async () => {
  try {
    const headers = {};
    const token = localStorage.getItem("token");
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await axios.get(BASE_URL, { headers });
    if (!res.data) {
      throw new Error("Error something went wrong fetching all sessions");
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// VIEW A SESSION
export const show = async (sessionId) => {
  try {
    const headers = {};
    const token = localStorage.getItem("token");
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await axios.get(`${BASE_URL}/${sessionId}`, { headers });
    if (!res.data) {
      throw new Error("Error something went wrong fetching the session");
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// CREATE A SESSION
export const create = async (sessionFormData) => {
  try {
    const res = await axios.post(BASE_URL, sessionFormData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.data) {
      throw new Error("Error something went wrong creating the session");
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// UPDATE A SESSION
export const update = async (sessionId, sessionFormData) => {
  try {
    const res = await axios.put(`${BASE_URL}/${sessionId}`, sessionFormData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.data) {
      throw new Error("Error something went wrong updating the session");
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// CREATE A BOOKING
export const createBooking = async (sessionId, userId) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/${sessionId}/bookings`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (!res.data) {
      throw new Error("Error something went wrong creating the session");
    }
    return res.data;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

// DELETE A SESSION
export const deleteSession = async (sessionId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${sessionId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.data) {
      throw new Error("Error something went wrong deleting the session");
    }
    return res.data;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};
