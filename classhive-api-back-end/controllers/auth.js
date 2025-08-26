const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/admin/sign-up", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.status(409).json({ err: "Username already taken." });
    }

    // create admin account
    const user = await User.create({
      username: req.body.username,
      hashedPassword: bcrypt.hashSync(req.body.password, 12),
      email: req.body.email,
      role: "owner",
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const payload = {
      username: user.username,
      _id: user._id,
      role: user.role,
    };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post("/instructor/sign-up", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.status(409).json({ err: "Username already taken." });
    }

    // create instructor account
    const user = await User.create({
      username: req.body.username,
      hashedPassword: bcrypt.hashSync(req.body.password, 12),
      email: req.body.email,
      role: "instructor",
      bio: req.body.bio,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const payload = {
      username: user.username,
      _id: user._id,
      role: user.role,
    };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post("/student/sign-up", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.status(409).json({ err: "Username already taken." });
    }

    // create student account
    const user = await User.create({
      username: req.body.username,
      hashedPassword: bcrypt.hashSync(req.body.password, 12),
      email: req.body.email,
      role: "student",
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const payload = {
      username: user.username,
      _id: user._id,
      role: user.role,
    };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log("Signing in user:", user);
    if (!user) return res.status(401).json({ err: "Invalid credentials." });

    // compare passwords
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.hashedPassword
    );
    console.log("isPasswordCorrect?", isPasswordCorrect);
    if (!isPasswordCorrect)
      return res.status(401).json({ err: "Invalid credentials." });

    // create payload
    const payload = {
      username: user.username,
      _id: user._id,
      role: user.role,
    };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET);
    res.status(209).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
