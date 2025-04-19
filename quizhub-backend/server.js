const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authController = require('./controllers/authController');
const leaderboardRoutes = require('./routes/leaderboard');


// Load .env variables
dotenv.config({ path: './config.env' });

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Allow all origins (for testing), or use your actual bucket URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.post('/api/signup', authController.signup);
app.post('/api/login', authController.login);
app.use('/api/leaderboard', leaderboardRoutes);
app.get('/', (req, res) => {
  res.status(200).send('OK');
});
app.get('/api/healthcheck', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});
// Server start
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

});
