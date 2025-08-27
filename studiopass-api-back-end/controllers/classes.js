const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const database = require("../queries/queries");

// STRETCH GOALS: filter query (by instructor, by date)

// GET - ALL SESSIONS - /classes
router.get("/", async (req, res) => {
  // unauth route available so non-logged in users can view classes
  try {
    const schedule = await database.getSessions();
    console.log("schedule from database:", schedule);
    res.status(200).json(schedule);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// GET - VIEW SESSION - /classes/:sessionId - # session page
router.get("/:sessionId", async (req, res) => {
  // unauth route available so non-logged in users can view a class
  // specific details visible or not, will be determined based on user role ?
  try {
    const session = await database.getSessionById(req.params.sessionId);
    console.log("session found is:", session);
    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// * might not be needed ?
// GET - VIEW SESSION ROSTER - /classes/:sessionId/bookings - # instructor/owner sees roster
router.get("/:sessionId/bookings", verifyToken, async (req, res) => {
  try {
    // access only for role: 'instructor' or 'owner'
    if (req.user.role === "student") {
      return res.status(403).send("You do not have permissions to do that.");
    }
    const session = await database.getSessionById(req.params.sessionId);
    console.log("session found is:", session);
    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// POST - CREATE NEW SESSION - /classes
router.post("/", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({
        error: "Forbidden",
        details: "You do not have permissions to do that.",
      });
    }
    // * only allow instructors to be selected on front-end from drop-down (username)
    const newSession = await database.createSession(req.body);
    if (!newSession) {
      return res.status(404).json({ error: "Instructor not found" });
    }
    res.status(201).json(newSession);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// PUT - EDIT SESSION DATA - /classes/:sessionId
router.put("/:sessionId", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({
        error: "Forbidden",
        details: "You do not have permissions to do that.",
      });
    }
    const updatedSession = await database.updateSessionData(
      req.params.sessionId,
      req.body
    );
    res.status(200).json(updatedSession);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// PUT - REASSIGN SESSION INSTRUCTOR - /classes/:sessionId/instructor
router.put("/:sessionId/instructor", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({
        error: "Forbidden",
        details: "You do not have permissions to do that.",
      });
    }
    const updatedSession = await database.updateSessionInstructor(
      req.params.sessionId,
      req.body.instructor
    );
    res.status(200).json(updatedSession);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// PUT - CANCEL SESSION - /classes/:sessionId/cancel
// updates the session status to 'canceled'
router.put("/:sessionId/cancel", verifyToken, async (req, res) => {
  try {
    if (req.user.role === "student") {
      return res.status(403).json({
        error: "Forbidden",
        details: "You do not have permissions to do that.",
      });
    }
    const canceledSession = await database.cancelSession(
      req.params.sessionId,
      req.user
    );
    if (!canceledSession) {
      return res.status(403).json({
        error: "Forbidden",
        details: "You do not have permissions to do that.",
      });
    }
    res.status(200).json(canceledSession);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// DELETE - DELETE SESSION - /classes/:sessionId (owner access only)
router.delete("/:sessionId", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({
        error: "Forbidden",
        details: "You do not have permissions to do that.",
      });
    }
    await database.deleteSession(req.params.sessionId);
    res.status(200).json({ message: "Session deleted successfully." });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// POST - CREATE NEW BOOKING - /classes/:sessionId/bookings
router.post("/:sessionId/bookings", verifyToken, async (req, res) => {
  try {
    const newBooking = await database.createBooking(
      req.params.sessionId,
      req.user._id
    );
    console.log("newBooking completed:", newBooking);
    if (!newBooking) {
      return res
        .status(403)
        .json({ error: "Duplicate booking or not valid permissions" });
    } else if (newBooking === "maxCapacityReached") {
      return res.status(409).json({
        error: "Session at max capacity",
        details: "Cannot book reservation; the class is already full.",
      });
    }
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
