const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    questions: [
        {
            question: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctAnswer: { type: String, required: true },
        },
    ],
});

module.exports = mongoose.model('Quiz', quizSchema);