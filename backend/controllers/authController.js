const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const store = require('../services/storeService');
const { JWT_SECRET } = require('../middleware/auth');
const { formatAddresses } = require('./customerController');

const signToken = (user) => {
  const id = user._id ? user._id.toString() : user.id;
  return jwt.sign(
    { userId: id, role: user.role || 'customer', email: user.email },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

function formatUserResponse(user) {
  return {
    _id: user._id ? user._id.toString() : user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role || 'customer',
    phone: user.phone || '',
    addresses: formatAddresses(user.addresses || [])
  };
}

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
        password,
        phone: phone || '',
        role: 'customer'
      });

      const token = signToken(user);
      return res.status(201).json({
        success: true,
        data: { token, user: formatUserResponse(user) }
      });
    }

    const user = store.createUser({ fullName, email: cleanEmail, password, phone });
    const token = signToken(user);

    return res.status(201).json({
      success: true,
      data: { token, user: formatUserResponse(user) }
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

    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: cleanEmail });
      if (user) {
        const isMatch = await user.comparePassword(password);
        if (isMatch) {
          const token = signToken(user);
          return res.json({
            success: true,
            data: { token, user: formatUserResponse(user) }
          });
        }
      }
    }

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
      data: { token, user: formatUserResponse(user) }
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res) => {
  return res.json({
    success: true,
    data: {
      user: formatUserResponse(req.user)
    }
  });
};

const updateProfile = async (req, res, next) => {
  try {
    const { fullName, phone } = req.body;
    if (fullName !== undefined && fullName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_NAME', message: 'Full name must be at least 2 characters.' }
      });
    }

    const userId = req.user._id ? req.user._id.toString() : req.user.id;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(userId)) {
      const updates = {};
      if (fullName !== undefined) updates.fullName = fullName.trim();
      if (phone !== undefined) updates.phone = phone.trim();

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true }
      ).select('-password');

      if (updatedUser) {
        return res.json({
          success: true,
          data: { user: formatUserResponse(updatedUser) }
        });
      }
    }

    const updated = store.updateUserProfile(userId, { fullName, phone });
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'User profile not found.' }
      });
    }

    return res.json({
      success: true,
      data: { user: formatUserResponse(updated) }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile
};
