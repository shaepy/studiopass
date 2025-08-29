import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/classes`;

// GET ALL SESSIONS
export const index = async () => {
  try {
    const res = await axios.get(BASE_URL);
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
    const res = await axios.get(`${BASE_URL}/${sessionId}`);
    if (!res.data) {
      throw new Error("Error something went wrong fetching the session");
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// CREATE A SESSION
export const create = async () => {
  try {
    const res = await axios.post(BASE_URL, {
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
