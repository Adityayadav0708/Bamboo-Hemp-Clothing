const jwt = require('jsonwebtoken');
const store = require('../services/storeService');
const { JWT_SECRET } = require('../middleware/auth');

const signToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role, email: user.email },
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

    const user = store.createUser({ fullName, email, password, phone });
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
          phone: user.phone
        }
      }
    });
  } catch (err) {
    if (err.message.includes('already exists')) {
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

    const user = store.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email address or password.' }
      });
    }

    const bcrypt = require('bcryptjs');
    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email address or password.' }
      });
    }

    user.lastLoginAt = new Date();
    store.persist();

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
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
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
