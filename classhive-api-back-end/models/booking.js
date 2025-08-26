const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["active", "canceled", "inactive"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
