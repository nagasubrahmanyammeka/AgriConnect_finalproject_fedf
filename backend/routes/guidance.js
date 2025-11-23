
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Schema
const guidanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

// Model
const Guidance = mongoose.model("Guidance", guidanceSchema, "guidance");

// POST - Create new guidance
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newGuidance = new Guidance({ name, email, message });
    const saved = await newGuidance.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error saving guidance", error: error.message });
  }
});

// GET - Fetch all guidance
router.get("/", async (req, res) => {
  try {
    const allGuidance = await Guidance.find().sort({ submittedAt: -1 });
    res.json(allGuidance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching guidance", error: error.message });
  }
});

module.exports = router;
