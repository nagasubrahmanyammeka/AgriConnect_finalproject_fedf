const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ---------------- Helper: Safe User Object ----------------
const getSafeUser = (user) => ({
  _id: user._id,
  name: user.name,
  username: user.username || "",
  email: user.email,
  role: user.role || "public",
  phone: user.phone || "",
  location: user.location || "",
});

// ---------------- REGISTER ----------------
exports.register = async (req, res) => {
  try {
    const { name, username, email, password, role, phone, location } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    if (username && (await User.findOne({ username })))
      return res.status(400).json({ message: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username: username || "",
      email,
      password: hashedPassword,
      role: role || "public",
      phone: phone || "",
      location: location || "",
    });

    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", { expiresIn: "7d" });
    res.status(201).json({ token, user: getSafeUser(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- LOGIN ----------------
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier = email OR username

    const user =
      (await User.findOne({ email: identifier })) ||
      (await User.findOne({ username: identifier }));

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", { expiresIn: "7d" });
    res.json({ token, user: getSafeUser(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- GET USER PROFILE ----------------
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user: getSafeUser(user) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
