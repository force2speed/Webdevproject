const express = require('express');
const leaderboardController = require('../controllers/leaderboardController');
const router = express.Router();

// Add a score to the leaderboard
router.post('/', leaderboardController.addScore);

// Get the leaderboard
router.get('/', leaderboardController.getLeaderboard);

module.exports = router;