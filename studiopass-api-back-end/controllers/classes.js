const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Session = require("../models/session");
const verifyToken = require("../middleware/verify-token");
const database = require("../queries/queries");

// GET - ALL SESSIONS - /classes
router.get("/", verifyToken, async (req, res) => {
  try {
    const schedule = await database.getSessions();
    console.log("schedule from database:", schedule);
    res.status(201).json(schedule);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// POST - CREATE SESSION - /classes
router.post("/", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).send("You do not have permissions to do that.");
    }
    const newSession = await database.createSession(req.body);
    console.log("newSession is:", newSession);
    res.status(201).json(newSession);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// PUT - EDIT SESSION - /classes/:classId
router.put("/:classId", verifyToken, async (req, res) => {
  //
});

// DELETE - DELETE SESSION - /classes/:classId
router.delete("/:classId", verifyToken, async (req, res) => {
  //
});

// POST - NEW BOOKING - /classes/:classId/bookings
router.post("/:classId/bookings", verifyToken, async (req, res) => {
  // * new booking
  // edit session to add new booking reference
});

/*
POST   /classes/:classId/bookings     # student books a class
GET    /classes/:classId/bookings     # instructor/owner sees roster
DELETE /classes/:classId/bookings/:bookingId   # cancel booking
*/

module.exports = router;
