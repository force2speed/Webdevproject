const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  quizzes: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
