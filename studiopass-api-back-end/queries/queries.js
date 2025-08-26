const Session = require("../models/session");

// TODO-ST re-test bookings .populate after students can book a class
const getSessions = async () => {
  try {
    const allSessions = await Session.find({}).populate("instructorId");
    console.log("SESSIONS FROM DATABASE:", allSessions);
    return allSessions;
  } catch (err) {
    throw new Error("Error something went wrong with fetching sessions");
  }
};

const createSession = async (reqBody) => {
  try {
    return await Session.create({
      title: reqBody.title,
      description: reqBody.description,
      startAt: new Date(reqBody.startAt),
      endAt: new Date(reqBody.endAt),
      capacity: reqBody.capacity || 5,
      status: "scheduled",
      instructorId: reqBody.instructor,
    });
  } catch (err) {
    throw new Error("Error something went wrong with creating a session");
  }
};

module.exports = { createSession, getSessions };
