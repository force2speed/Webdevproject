const express = require('express');
const Leaderboard = require('../models/leaderboard');
const router = express.Router();

// Handle score submissions
router.post('/', async (req, res) => {
    try {
        const { name, score, quizzes, perfectQuiz, percentage } = req.body;
        
        // Find the user's most recent record (regardless of date)
        const userRecord = await Leaderboard.findOne({ name })
            .sort({ timestamp: -1 }) // Get the most recent record
            .exec();

        if (userRecord) {
            // Update the existing user's total quizzes count
            userRecord.totalQuizzesAttempted += 1;
            
            // Create a new entry for this attempt
            const newEntry = new Leaderboard({
                name,
                score: userRecord.score + score,
                quizzes: userRecord.quizzes + quizzes,
                perfectQuiz: userRecord.perfectQuiz || perfectQuiz,
                percentage: (userRecord.score/userRecord.quizzes)*100,
                totalQuizzesAttempted: userRecord.totalQuizzesAttempted
            });
            
            await newEntry.save();
            res.status(200).json({
                message: "Score added and total quizzes updated",
                user: newEntry
            });
        } else {
            // First time user - create new record
            const newEntry = new Leaderboard({
                name,
                score,
                quizzes,
                perfectQuiz,
                percentage,
                totalQuizzesAttempted: 1
            });
            
            await newEntry.save();
            res.status(201).json({
                message: "New user record created",
                user: newEntry
            });
        }
    } catch (err) {
        console.error("Error saving score:", err);
        res.status(500).json({ 
            message: "Failed to save score",
            error: err.message 
        });
    }
});

// Get leaderboard data
router.get('/', async (req, res) => {
    try {
        // Get the latest record for each user
        const leaderboard = await Leaderboard.aggregate([
            {
                $sort: { timestamp: -1 }
            },
            {
                $group: {
                    _id: "$name",
                    doc: { $first: "$$ROOT" }
                }
            },
            {
                $replaceRoot: { newRoot: "$doc" }
            },
            {
                $sort: { score: -1 }
            },
            {
                $limit: 100
            }
        ]);
        
        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;