const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const database = require("../queries/queries");

// GET - VIEW USER BOOKINGS (student) or VIEW SESSIONS (instructor/owner)
router.get("/", verifyToken, async (req, res) => {
  try {
    const { role, _id } = req.user;
    let agenda = [];
    if (role === "student") agenda = await database.getBookingsByUserId(_id);
    else agenda = await database.getSessionsByInstructor(_id);
    res.status(200).json(agenda);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// PUT - CANCEL A BOOKING (remove from session) - /agenda/:bookingId
router.put("/:bookingId", verifyToken, async (req, res) => {
  try {
    const removedBooking = await database.updateBookingStatus(
      req.params.bookingId,
      req.user
    );
    console.log("removedBooking is:", removedBooking);
    res
      .status(200)
      .json(removedBooking, {
        message: "Successfully canceled booking and removed from session.",
      });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
