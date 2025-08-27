// ROOT /account/bookings
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const database = require("../queries/queries");

/*
DELETE /classes/:sessionId/bookings/:bookingId -- # delete booking (owner) ?
*/

// GET - VIEW ALL BOOKINGS - /account/bookings
router.get("/", verifyToken, async (req, res) => {
  try {
    const bookings = await database.getBookingsByUserId(req.user._id);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// PUT - CANCEL A BOOKING - /account/bookings/:bookingId
router.put("/:bookingId", verifyToken, async (req, res) => {
  try {
    const canceledBooking = await database.updateBookingStatus(
      req.params.bookingId
    );
    console.log("canceledBooking is:", canceledBooking);
    res
      .status(200)
      .json(canceledBooking, { message: "Successfully canceled booking." });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
