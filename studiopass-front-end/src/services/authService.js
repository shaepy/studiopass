const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;
import axios from "axios";

export const signUp = async (formData, role) => {
  try {
    const res = await axios.post(`${BASE_URL}/sign-up?role=${role}`, formData);
    if (!res.data) throw new Error("Error something went wrong creating user");
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      return JSON.parse(atob(res.data.token.split(".")[1])).payload;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/sign-in`, formData);
    if (!res.data)
      throw new Error("Error something went wrong signing in user");
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      return JSON.parse(atob(res.data.token.split(".")[1])).payload;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
