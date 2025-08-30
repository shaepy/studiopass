const User = require("../models/user");

const getAllUsers = async () => {
  return await User.find({});
};

const getStaffList = async () => {
  return await User.find({ role: { $in: ["instructor", "owner"] } });
};

const getStudents = async () => {
  return await User.find({ role: "student" });
};

const getUserById = async (userId) => {
  return await User.findById(userId).populate([
    {
      path: "bookings",
      populate: { path: "sessionId" },
    },
    "sessions",
  ]);
};

const addUserReservedStatus = async (session, userId) => {
  try {
    const user = await User.findById(userId).populate("bookings");
    if (user.role === "student") {
      const isBooked = user.bookings.some(
        (booking) => booking.sessionId.toString() === session._id.toString()
      );
      session.reserved = isBooked ? true : false;
    }
    return session;
  } catch (err) {
    console.log(err);
    throw new Error(
      "Error something went wrong with adding reserved status on session"
    );
  }
};

module.exports = {
  addUserReservedStatus,
  getAllUsers,
  getStaffList,
  getStudents,
  getUserById,
};
