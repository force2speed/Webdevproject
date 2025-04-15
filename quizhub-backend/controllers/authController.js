const User = require('../models/User');

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Create user - password will be hashed by User model's pre-save hook
    const newUser = new User({
      username,
      email,
      password // Pass plain text password
    });

    await newUser.save();
    
    res.status(201).json({ 
      success: true,
      message: 'User created successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (error) {
    // Handle duplicate key errors (MongoDB E11000 error)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`,
        field: field
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }

    // Generic error handler
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user with password explicitly selected
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Use the model method to compare passwords
    const isPasswordCorrect = await user.correctPassword(password);
    
    if (!isPasswordCorrect) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Login successful
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { signup, login };