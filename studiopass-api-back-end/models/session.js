const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startAt: { type: Date, required: true },
  endAt: { type: Date, required: true },
  capacity: {
    type: Number,
    required: true,
    default: 10,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
  status: {
    type: String,
    enum: ["scheduled", "canceled", "inactive"],
  },
});

module.exports = mongoose.model("Session", sessionSchema);
