const express = require("express");
const router = express.Router();
const User = require("../models/user");
const verifyToken = require("../middleware/verify-token");

router.get("/", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({
        error: "Forbidden",
        details: "You do not have permissions to do that.",
      });
    }
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/staff", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({
        error: "Forbidden",
        details: "You do not have permissions to do that.",
      });
    }
    const users = await User.find({ role: { $in: ["instructor", "owner"] } });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/students", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({
        error: "Forbidden",
        details: "You do not have permissions to do that.",
      });
    }
    const students = await User.find({ role: "student" });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/:userId", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({
        error: "Forbidden",
        details: "You do not have permissions to do that.",
      });
    }

    const user = await User.findById(req.params.userId);
    console.log("User found is:", user);

    if (!user) return res.status(404).json({ err: "User not found." });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
