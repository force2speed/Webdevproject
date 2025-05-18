const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    index: true
  },
  score: { 
    type: Number, 
    required: true,
    min: 0
  },
  quizzes: { 
    type: Number, 
    required: true,
    min: 1
  },
  perfectQuiz: {
    type: Boolean,
    required: true,
    default: false
  },
  percentage: {
  type: Number,
  required: true,
  min: 0,
  max: 100,
  set: v => Math.round(v * 100) / 100  // rounds to 2 decimals
}
,
  totalQuizzesAttempted: {  // NEW FIELD
    type: Number,
    required: true,
    default: 0
  },
  timestamp: { 
    type: Date, 
    default: Date.now,
    index: true
  }
});

// Indexes
leaderboardSchema.index({ score: -1, timestamp: 1 });
leaderboardSchema.index({ name: 1, score: -1 });

module.exports = mongoose.model("Leaderboard", leaderboardSchema);