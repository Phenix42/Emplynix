import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Server configuration error' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create admin user
router.post('/create-admin', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, password, and name are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({
      email,
      password,
      name,
      role: 'admin',
    });
    await user.save();
    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Validate token
router.get('/validate', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('email name role');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;