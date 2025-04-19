const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authController = require('./controllers/authController');
const leaderboardRoutes = require('./routes/leaderboard');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, 'config.env') });

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.post('/api/signup', authController.signup);
app.post('/api/login', authController.login);
app.use('/api/leaderboard', leaderboardRoutes);
app.get('/', (req, res) => res.status(200).send('OK'));
app.get('/api/healthcheck', (req, res) => res.status(200).json({ status: 'healthy' }));
app.get('/health', (req, res) => res.status(200).send('OK'));

// Server start with robust error handling
const PORT = process.env.PORT || 8081;
const HOST = '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
})
.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} already in use`);
  } else {
    console.error('❌ Server startup error:', err);
  }
  process.exit(1);
});

// Verify port binding
server.on('listening', () => {
  const addr = server.address();
  console.log(`🔗 Server bound to ${addr.address}:${addr.port}`);
});