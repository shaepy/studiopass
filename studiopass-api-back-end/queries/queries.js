const Session = require("../models/session");
const Booking = require("../models/booking");
const User = require("../models/user");

// TODO-ST: prevention for not being able to create something new, scheduled in the past

const getSessions = async () => {
  try {
    return await Session.find({})
      .populate(["instructorId", "bookings"])
      .sort({ startAt: "asc" });
  } catch (err) {
    console.log(err);
    throw new Error("Error something went wrong with fetching sessions");
  }
};

const getSessionById = async (sessionId) => {
  try {
    const session = await Session.findById(sessionId).populate({
      path: "bookings",
      populate: { path: "userId" },
    });
    return session;
  } catch (err) {
    console.log(err);
    throw new Error("Error something went wrong with fetching session by ID");
  }
};

const createSession = async (reqBody) => {
  try {
    // req.body.instructor will be a username
    const instructor = await User.findOne({ username: reqBody.instructor });
    console.log("instructor found by username:", instructor);

    const {
      startAtDate,
      startAtTime,
      endAtDate,
      endAtTime,
      timezone = "-07:00", // if no timezone is passed, default
    } = reqBody;

    const startAt = new Date(`${startAtDate}T${startAtTime}:00${timezone}`);
    const endAt = new Date(`${endAtDate}T${endAtTime}:00${timezone}`);

    const newSession = await Session.create({
      title: reqBody.title,
      description: reqBody.description,
      startAt: startAt,
      endAt: endAt,
      capacity: reqBody.capacity || 3,
      status: "scheduled",
      instructorId: instructor._id,
    });
    console.log("newSession created:", newSession);

    instructor.sessions.push(newSession);
    await instructor.save();
    console.log("Successfully added session to instructor.sessions");

    return newSession;
  } catch (err) {
    console.log(err);
    throw new Error("Error something went wrong with creating a session");
  }
};

const updateSessionData = async (sessionId, reqBody) => {
  try {
    const {
      startAtDate,
      startAtTime,
      endAtDate,
      endAtTime,
      timezone = "-07:00", // if no timezone is passed, default
    } = reqBody;

    console.log(
      "Date string being created:",
      `${startAtDate}T${startAtTime}:00${timezone}`
    );
    const startAt = new Date(`${startAtDate}T${startAtTime}:00${timezone}`);
    console.log("startAt UTC:", startAt.toISOString());
    console.log("startAt Local:", startAt.toString());

    const endAt = new Date(`${endAtDate}T${endAtTime}:00${timezone}`);
    console.log("startAt UTC:", endAt.toISOString());
    console.log("startAt Local:", endAt.toString());

    const updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      {
        title: reqBody.title,
        description: reqBody.description,
        startAt: startAt,
        endAt: endAt,
        capacity: reqBody.capacity,
      },
      { new: true }
    );
    console.log("updatedSession is:", updatedSession);
    return updatedSession;
  } catch (err) {
    console.log(err);
    throw new Error(
      "Error something went wrong with updating the session data"
    );
  }
};

const updateSessionInstructor = async (sessionId, username) => {
  try {
    // remove from exInstructor's sessions
    const session = await Session.findById(sessionId);
    const exInstructor = await User.findById(session.instructorId);
    exInstructor.sessions.pull(session._id);
    await exInstructor.save();

    // add to newInstructor's sessions
    const newInstructor = await User.findOne({ username: username });
    newInstructor.sessions.push(session);
    await newInstructor.save();

    // update session to newInstructor
    session.instructorId = newInstructor._id;
    const updatedSession = await session.save();
    return updatedSession;
  } catch (err) {
    console.log(err);
    throw new Error(
      "Error something went wrong with reassigning session instructor"
    );
  }
};

// post-mvp: allow notification/email of class cancellation
const cancelSession = async (sessionId, user) => {
  try {
    const session = await Session.findById(sessionId).populate("bookings");
    console.log("session to cancel is:", session);

    if (
      user.role === "instructor" &&
      user._id.toString() !== session.instructorId.toString()
    ) {
      console.log("Invalid instructorId. Access denied");
      return null;
    }

    console.log("session.bookings details:", session.bookings);
    // Loop through each booking in the session
    for (const booking of session.bookings) {
      console.log(
        `Processing booking ${booking._id} for user ${booking.userId}`
      );
      const user = await User.findById(booking.userId);
      if (user) {
        user.bookings.pull(booking._id);
        await user.save();
        console.log(
          `Removed booking ${booking._id} from user ${user.username}'s bookings`
        );
      }
    }

    // Delete all bookings from the Booking model
    const bookingIds = session.bookings.map((booking) => booking._id);
    await Booking.deleteMany({ _id: { $in: bookingIds } });
    console.log(`Deleted ${bookingIds.length} bookings from Booking model`);

    // Update session status to canceled and clear bookings array
    session.status = "canceled";
    session.bookings = [];
    const canceledSession = await session.save();

    return canceledSession;
  } catch (err) {
    console.log(err);
    throw new Error("Error something went wrong canceling the session");
  }
};

const createBooking = async (sessionId, userId) => {
  try {
    const user = await User.findById(userId);
    const session = await Session.findById(sessionId).populate("bookings");
    console.log("session found:", session);

    // if this session's bookings userId matches this userId, return null
    const isDuplicate = session.bookings.some(
      (booking) => booking.userId.toString() === userId
    );
    if (isDuplicate) return null;

    // else, create booking
    const newBooking = await Booking.create({
      sessionId: sessionId,
      userId: user._id,
      status: "active",
    });

    // add booking to user's bookings and session's bookings
    user.bookings.push(newBooking);
    await user.save();
    session.bookings.push(newBooking);
    await session.save();

    return newBooking;
  } catch (err) {
    console.log(err);
    throw new Error("Error something went wrong with creating a booking");
  }
};

const getBookingById = async (bookingId) => {
  try {
    const booking = await Booking.findById(bookingId).populate("sessionId");
    console.log("booking found by ID:", booking);
    return booking;
  } catch (err) {
    console.log(err);
    throw new Error("Error something went wrong with cancelling a booking");
  }
};

const getBookingsByUserId = async (userId) => {
  try {
    const bookings = await Booking.find({ userId: userId })
      .populate("sessionId")
      .sort({ status: "asc" });
    console.log("user found for bookings:", bookings);
    return bookings;
  } catch (err) {
    console.log(err);
    throw new Error("Error something went wrong with cancelling a booking");
  }
};

const updateBookingStatus = async (bookingId) => {
  try {
    const canceledBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "canceled" },
      { new: true }
    );
    console.log("canceledBooking is complete:", canceledBooking);
    const session = await Session.findById(canceledBooking.sessionId).populate(
      "bookings"
    );
    console.log("session found:", session);

    // remove booking from session
    session.bookings.pull(bookingId);
    const updatedSession = await session.save();

    return updatedSession;
  } catch (err) {
    console.log(err);
    throw new Error("Error something went wrong with cancelling a booking");
  }
};

module.exports = {
  // Session
  createSession,
  getSessions,
  createBooking,
  getSessionById,
  updateSessionData,
  updateSessionInstructor,
  cancelSession,
  // Booking
  getBookingsByUserId,
  getBookingById,
  updateBookingStatus,
};
