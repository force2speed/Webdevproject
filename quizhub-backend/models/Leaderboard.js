const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true }, // Score for a specific quiz
    quizId: { type: String, required: true }, // ID of the quiz (from Trivia API)
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);