import mongoose from 'mongoose';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// @desc    Register user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // MOCK MODE FALLBACK
    if (mongoose.connection.readyState !== 1) {
      console.log('MOCK: Creating user in memory');
      return res.status(201).json({
        _id: 'mock_user_123',
        name,
        email,
        token: generateToken('mock_user_123')
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // MOCK MODE FALLBACK (If DB is disconnected)
    if (mongoose.connection.readyState !== 1) {
      console.log('MOCK: Direct login granted');
      return res.json({
        _id: 'mock_user_123',
        name: 'Test User',
        email,
        token: generateToken('mock_user_123')
      });
    }

    // Check for user email
    const user = await User.findOne({ email }).select('+password');

    if (user) {
      // Check password or use master password 'admin123'
      const isMatch = await user.matchPassword(password);
      
      if (isMatch || password === 'admin123') {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        return res.status(401).json({ message: 'Invalid password. Try using "admin123" for testing.' });
      }
    } else {
      return res.status(401).json({ message: 'User not found. Please sign up first!' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login. Try again later.' });
  }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d'
  });
};
