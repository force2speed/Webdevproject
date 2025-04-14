const Leaderboard = require('../models/Leaderboard');
const User = require('../models/User');

// Add a score to the leaderboard
exports.addScore = async (req, res) => {
    const { userId, quizId, score } = req.body;
    try {
        const leaderboardEntry = new Leaderboard({ user: userId, quizId, score });
        await leaderboardEntry.save();

        // Update user's total marks
        const user = await User.findById(userId);
        user.marks += score;
        await user.save();

        res.status(201).json(leaderboardEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get the leaderboard
exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find()
            .populate('user', 'username marks')
            .sort({ score: -1 }); // Sort by score in descending order
        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};