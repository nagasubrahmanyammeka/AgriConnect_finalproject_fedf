const express = require("express");
const router = express.Router();

// Simple crop suggestion API
router.post("/", (req, res) => {
  const { ph, moisture } = req.body;
  let crop = "Wheat";
  if (ph < 5.5) crop = "Rice";
  else if (moisture < 40) crop = "Millet";

  res.json({ suggestion: `Recommended crop: ${crop}` });
});

module.exports = router;
