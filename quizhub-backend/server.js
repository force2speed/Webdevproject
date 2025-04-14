
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock leaderboard data
const leaderboardData = [
    { rank: 1, name: "Dhruv Dhoundiyal", score: 950, quizzes: 45 },
    { rank: 2, name: "Jane Smith", score: 920, quizzes: 42 },
    { rank: 3, name: "Alex Turner", score: 900, quizzes: 41 },
    { rank: 4, name: "Emily Davis", score: 880, quizzes: 39 },
    { rank: 5, name: "Michael Johnson", score: 860, quizzes: 37 },
];

// Leaderboard API endpoint
app.get('/api/leaderboard', (req, res) => {
    res.json(leaderboardData);
});
app.post('/api/leaderboard', (req, res) => {
    const { name, score, quizzes } = req.body;

    // Validate input
    if (!name || typeof score !== 'number' || typeof quizzes !== 'number') {
        return res.status(400).json({ error: 'Invalid input: name, score, and quizzes are required, and score/quizzes must be numbers' });
    }

    // Add the new score to the leaderboard
    leaderboardData.push({ rank: leaderboardData.length + 1, name, score, quizzes });

    // Sort the leaderboard by score (descending)
    leaderboardData.sort((a, b) => b.score - a.score);

    // Update ranks
    leaderboardData.forEach((player, index) => {
        player.rank = index + 1;
    });

    res.status(201).json({ message: 'Score added successfully', leaderboard: leaderboardData });
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});