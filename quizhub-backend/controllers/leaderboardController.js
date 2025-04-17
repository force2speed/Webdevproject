// controllers/leaderboardController.js
const Leaderboard = require('../models/leaderboard');

// Submit score to leaderboard
exports.submitScore = async (req, res) => {
  try {
    const { name, score, quizzes, perfectQuiz, percentage } = req.body;

    // Validate input
    if (!name || typeof score !== 'number' || typeof quizzes !== 'number') {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Create new leaderboard entry
    const newEntry = await Leaderboard.create({
      name,
      score,
      quizzes,
      perfectQuiz,
      percentage,
      timestamp: new Date()
    });

    res.status(201).json({
      status: 'success',
      data: {
        entry: newEntry
      }
    });

  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to submit score',
      details: err.message 
    });
  }
};

// Get leaderboard data
exports.getLeaderboard = async (req, res) => {
  try {
    // Get top 50 scores, sorted by score (descending) and timestamp (ascending)
    const leaderboard = await Leaderboard.find()
      .sort({ score: -1, timestamp: 1 })
      .limit(50);

    res.status(200).json({
      status: 'success',
      results: leaderboard.length,
      data: {
        leaderboard
      }
    });

  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to fetch leaderboard',
      details: err.message 
    });
  }
};

// Get user's personal best scores
exports.getUserScores = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    // Get user's top 10 scores
    const userScores = await Leaderboard.find({ name: username })
      .sort({ score: -1, timestamp: 1 })
      .limit(10);

    res.status(200).json({
      status: 'success',
      results: userScores.length,
      data: {
        scores: userScores
      }
    });

  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to fetch user scores',
      details: err.message 
    });
  }
};