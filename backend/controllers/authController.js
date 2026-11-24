const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const store = require('../services/storeService');
const { JWT_SECRET } = require('../middleware/auth');

const signToken = (user) => {
  const id = user._id ? user._id.toString() : user.id;
  return jwt.sign(
    { userId: id, role: user.role || 'customer', email: user.email },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

const register = async (req, res, next) => {
  try {
    const { fullName, email, password, phone } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        error: { code: 'BAD_REQUEST', message: 'Full name, email address, and password are required.' }
      });
    }

    if (password.length < 8) {
      return res.status(422).json({
        success: false,
        error: { code: 'WEAK_PASSWORD', message: 'Password must be at least 8 characters in length.' }
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Try MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      const existing = await User.findOne({ email: cleanEmail });
      if (existing) {
        return res.status(409).json({
          success: false,
          error: { code: 'ACCOUNT_EXISTS', message: 'An account with this email address already exists.' }
        });
      }

      const user = await User.create({
        fullName: fullName.trim(),
        email: cleanEmail,
        password, // Handled by pre-save bcrypt hook in User model
        phone: phone || '',
        role: 'customer'
      });

      const token = signToken(user);
      return res.status(201).json({
        success: true,
        data: {
          token,
          user: {
            _id: user._id.toString(),
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            phone: user.phone,
            addresses: user.addresses || []
          }
        }
      });
    }

    // 2. Fallback to in-memory store
    const user = store.createUser({ fullName, email: cleanEmail, password, phone });
    const token = signToken(user);

    return res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          phone: user.phone,
          addresses: user.addresses || []
        }
      }
    });
  } catch (err) {
    if (err.message && err.message.includes('already exists')) {
      return res.status(409).json({
        success: false,
        error: { code: 'ACCOUNT_EXISTS', message: err.message }
      });
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: { code: 'BAD_REQUEST', message: 'Email and password are required.' }
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Try MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: cleanEmail });
      if (user) {
        const isMatch = await user.comparePassword(password);
        if (isMatch) {
          const token = signToken(user);
          return res.json({
            success: true,
            data: {
              token,
              user: {
                _id: user._id.toString(),
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                phone: user.phone,
                addresses: user.addresses || []
              }
            }
          });
        }
      }
    }

    // 2. Check fallback store
    const user = store.getUserByEmail(cleanEmail);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email address or password.' }
      });
    }

    const hash = user.passwordHash || user.password;
    const isMatch = hash ? bcrypt.compareSync(password, hash) : false;
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email address or password.' }
      });
    }

    const token = signToken(user);
    return res.json({
      success: true,
      data: {
        token,
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          phone: user.phone,
          addresses: user.addresses || []
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res) => {
  const user = req.user;
  return res.json({
    success: true,
    data: {
      user: {
        _id: user._id ? user._id.toString() : user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone || '',
        addresses: user.addresses || []
      }
    }
  });
};

module.exports = {
  register,
  login,
  getMe
};
