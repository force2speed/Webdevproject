const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/Leaderboard");

// Get all leaderboard data (sorted by score descending)
router.get("/", async (req, res) => {
  try {
    const data = await Leaderboard.find().sort({ score: -1 });

    const rankedData = data.map((player, index) => ({
      rank: index + 1,
      name: player.name,
      score: player.score,
      quizzes: player.quizzes
    }));

    res.json(rankedData);
  } catch (err) {
    res.status(500).json({ error: "Failed to load leaderboard data" });
  }
});

// Add/update a player's score
router.post("/", async (req, res) => {
  const { name, score, quizzes } = req.body;

  try {
    let player = await Leaderboard.findOne({ name });

    if (player) {
      // Update if existing
      player.score = score;
      player.quizzes = quizzes;
      await player.save();
    } else {
      // Create new
      player = new Leaderboard({ name, score, quizzes });
      await player.save();
    }

    res.status(200).json({ message: "Leaderboard updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update leaderboard" });
  }
});

module.exports = router;
