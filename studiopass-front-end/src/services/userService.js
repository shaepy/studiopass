const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;
import axios from "axios";

// VIEW STAFF - GET
export const getStaff = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/staff`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.data) {
      throw new Error("Error something went wrong fetching users");
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// VIEW USER - GET
export const getUser = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.data) {
      throw new Error(`Error something went wrong fetching user ${userId}`);
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
